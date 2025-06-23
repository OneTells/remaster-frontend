import styles from "./AthleteModal.module.css";

import React, {use} from "react";

import {DefaultAthleteType, ModalContext} from "@/app/document/_context/modal-context.tsx";
import {AthleteType, DocumentType, MunicipalityType, OrganizationType, SportType} from "@/app/document/_types.tsx";
import {createAthlete} from "@/app/document/_api.tsx";
import {Select} from "@/_ui/select/Select.tsx";
import {Button} from "@/_ui/button/Button.tsx";
import {useNavigationData} from "@/_hook/useNavigationData.tsx";
import {DopingAthleteType} from "@/app/doping-athletes/_types.tsx";


type Props = {
    documentId: number;
    update: () => Promise<void>;

    athlete: DefaultAthleteType | AthleteType;
    setAthlete: React.Dispatch<React.SetStateAction<DefaultAthleteType | AthleteType>>;
}

export function AthleteModal({documentId, update, athlete, setAthlete}: Props) {
    const data = useNavigationData<{
        sports: SportType[],
        document: DocumentType,
        dopingAthletes: DopingAthleteType[],
        organizations: OrganizationType[],
        municipalities: MunicipalityType[]
    }>();

    const [state, modalDispatch] = use(ModalContext);

    if (state.mode !== 'EDIT_MENU')
        throw new Error('Unexpected mode: ' + state.mode);

    const createOnClick = async () => {
        if (!Object.values(athlete).every(val => val !== null && val !== ''))
            return;

        await createAthlete(documentId, athlete as AthleteType, state.athlete.doping_data, state.athlete.result_data);
        await update();

        modalDispatch({mode: 'CLOSE'});
    };

    return (
        <div className={styles["athlete-info-card"]}>
            <div className={styles["center-column-with-gaps"]}>
                <div className={styles["info-block"]}>
                    <p className={styles["text"]}>ФИО</p>
                    <div className={styles["hierarchical-text-container"]}>
                        <input
                            value={athlete.full_name}
                            onChange={(e) => setAthlete(prev => ({...prev, 'full_name': e.target.value}))}
                            type={styles["text"]}
                            className={styles["input-field-with-border-radius"]}
                        />
                    </div>
                </div>
                <div className={styles["info-block"]}>
                    <p className={styles["text"]}>Дата рождения</p>
                    <div className={styles["hierarchical-text-container"]}>
                        <input
                            type="date"
                            max={new Date().toISOString().split('T')[0]}
                            className={styles["input-field-with-border-radius"]}
                            style={{height: "44px", paddingRight: "10px", colorScheme: 'dark'}}
                            value={athlete.birth_date}
                            onChange={(e) => setAthlete(prev => ({...prev, 'birth_date': e.target.value}))}
                        />
                    </div>
                </div>
                <div className={styles["info-block"]}>
                    <p className={styles["text"]}>Вид спорта</p>
                    <div className={styles["hierarchical-text-container"]}>
                        <Select
                            options={data.sports.map(({name, ...rest}) => ({...rest, label: name}))}
                            selectedOptionId={athlete.sport_id}
                            setSelectedOptionId={(id) => setAthlete(prev => ({...prev, 'sport_id': id}))}
                            style={{width: '100%'}}
                        />
                    </div>
                </div>
                <div className={styles["info-block"]}>
                    <p className={styles["text"]}>
                        Муниципальное
                        <br/>
                        образование
                    </p>
                    <div className={styles["hierarchical-text-container"]}>
                        <Select
                            options={data.municipalities.map(({title, ...rest}) => ({...rest, label: title}))}
                            selectedOptionId={athlete.municipality_id}
                            setSelectedOptionId={(id) => setAthlete(prev => ({...prev, 'municipality_id': id}))}
                            style={{width: '100%'}}
                        />
                    </div>
                </div>
                <div className={styles["info-block"]}>
                    <p className={styles["text"]}>Организация</p>
                    <div className={styles["hierarchical-text-container"]}>
                        <Select
                            options={
                                data.organizations
                                    .filter(org => org.sport_id === athlete.sport_id)
                                    .map(({title, ...rest}) => ({...rest, label: title}))
                            }
                            selectedOptionId={athlete.organization_id}
                            setSelectedOptionId={(id) => setAthlete(prev => ({...prev, 'organization_id': id}))}
                            style={{width: '100%'}}
                            disabled={athlete.sport_id === null}
                        />
                    </div>
                </div>
                <div className={styles["info-block"]}>
                    <p className={styles["text"]}>Присвоить разряд</p>
                    <div className={styles["hierarchical-text-container"]}>
                        <Select
                            options={[
                                {id: 1, label: 'Да'},
                                {id: 2, label: 'Нет'},
                            ]}
                            selectedOptionId={
                                athlete.is_sports_category_granted !== null
                                    ? (athlete.is_sports_category_granted ? 1 : 2)
                                    : null
                            }
                            setSelectedOptionId={(id) => setAthlete(prev => ({
                                ...prev,
                                'is_sports_category_granted': id === 1
                            }))}
                            style={{width: '100%'}}
                        />
                    </div>
                </div>
                <div className={styles["info-block"]}>
                    <p className={styles["text"]}>Тест на допинг</p>
                    <div className={styles["hierarchical-text-container"]}>
                        <Select
                            options={[
                                {id: 1, label: 'Отрицательный'},
                                {id: 2, label: 'Положительный'},
                            ]}
                            selectedOptionId={
                                athlete.is_doping_check_passed !== null
                                    ? (athlete.is_doping_check_passed ? 1 : 2)
                                    : null
                            }
                            setSelectedOptionId={(id) => setAthlete(prev => ({
                                ...prev,
                                'is_doping_check_passed': id === 1
                            }))}
                            style={{width: '100%'}}
                        />
                    </div>
                </div>
            </div>
            <div style={{flexDirection: 'row', display: 'flex', gap: '10px', marginTop: '5px'}}>
                <Button
                    style={{height: '44px', padding: '10px 20px', width: '100%'}}
                    onClick={async () => modalDispatch({mode: 'OPEN_CHECK_DOPING_MENU'})}
                    disabled={athlete.birth_date === ''}
                >
                    Проверить на допинг
                </Button>
                <Button
                    style={{height: '44px', padding: '10px 20px', width: '100%'}}
                    onClick={async () => modalDispatch({mode: 'OPEN_CHECK_RESULT_MENU'})}
                    disabled={athlete.sport_id === null}
                >
                    Проверить по результату
                </Button>
            </div>
            {
                !('id' in state.athlete) && (
                    <Button
                        style={{height: '44px', padding: '10px 20px'}}
                        onClick={createOnClick}
                        disabled={!Object.values(athlete).every(val => val !== null && val !== '')}
                    >
                        Создать атлета
                    </Button>
                )
            }
        </div>
    );
}

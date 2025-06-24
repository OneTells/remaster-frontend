import styles from "./AthleteModal.module.css";

import {use} from "react";

import {ModalContext} from "@/app/document/_context/modal-context.tsx";
import {AthleteType, DocumentType, ModuleType, MunicipalityType, OrganizationType, SportType} from "@/app/document/_types.tsx";
import {createAthlete} from "@/app/document/_api.tsx";
import {Select} from "@/_ui/select/Select.tsx";
import {Button} from "@/_ui/button/Button.tsx";
import {useNavigationData} from "@/_hook/useNavigationData.tsx";
import {DopingAthleteType} from "@/app/doping-athletes/_types.tsx";


type Props = {
    documentId: number;
    update: () => Promise<void>;
}

export function AthleteModal({documentId, update}: Props) {
    const data = useNavigationData<{
        sports: SportType[],
        document: DocumentType,
        dopingAthletes: DopingAthleteType[],
        organizations: OrganizationType[],
        municipalities: MunicipalityType[],
        modules: ModuleType[]
    }>();

    const [state, modalDispatch] = use(ModalContext);

    if (state.mode !== 'EDIT_MENU')
        throw new Error('Unexpected mode: ' + state.mode);

    const createOnClick = async () => {
        if (!Object.values(state.athlete).every(val => val !== null && val !== ''))
            return;

        await createAthlete(documentId, state.athlete as AthleteType, state.athlete.doping_data, state.athlete.result_data);
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
                            value={state.athlete.full_name}
                            onChange={(e) => {
                                modalDispatch({
                                    mode: 'UPDATE_ATHLETE_DATA',
                                    athlete: {'full_name': e.target.value}
                                });
                            }}
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
                            value={state.athlete.birth_date}
                            onChange={(e) => {
                                modalDispatch({
                                    mode: 'UPDATE_ATHLETE_DATA',
                                    athlete: {'birth_date': e.target.value}
                                });
                            }}
                        />
                    </div>
                </div>
                <div className={styles["info-block"]}>
                    <p className={styles["text"]}>Вид спорта</p>
                    <div className={styles["hierarchical-text-container"]}>
                        <Select
                            options={data.sports.map(({name, ...rest}) => ({...rest, label: name}))}
                            selectedOptionId={state.athlete.sport_id}
                            setSelectedOptionId={(id) => {
                                modalDispatch({
                                    mode: 'UPDATE_ATHLETE_DATA',
                                    athlete: {'sport_id': id}
                                });
                            }}
                            style={{width: '100%'}}
                            searchable={true}
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
                            selectedOptionId={state.athlete.municipality_id}
                            setSelectedOptionId={(id) => {
                                modalDispatch({
                                    mode: 'UPDATE_ATHLETE_DATA',
                                    athlete: {'municipality_id': id}
                                });
                            }}
                            style={{width: '100%'}}
                            searchable={true}
                        />
                    </div>
                </div>
                <div className={styles["info-block"]}>
                    <p className={styles["text"]}>Организация</p>
                    <div className={styles["hierarchical-text-container"]}>
                        <Select
                            options={
                                data.organizations
                                    .filter(org => org.sport_id === state.athlete.sport_id)
                                    .map(({title, ...rest}) => ({...rest, label: title}))
                            }
                            selectedOptionId={state.athlete.organization_id}
                            setSelectedOptionId={(id) => {
                                modalDispatch({
                                    mode: 'UPDATE_ATHLETE_DATA',
                                    athlete: {'organization_id': id}
                                });
                            }}
                            style={{width: '100%'}}
                            disabled={state.athlete.sport_id === null}
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
                                state.athlete.is_sports_category_granted !== null
                                    ? (state.athlete.is_sports_category_granted ? 1 : 2)
                                    : null
                            }
                            setSelectedOptionId={(id) => {
                                modalDispatch({
                                    mode: 'UPDATE_ATHLETE_DATA',
                                    athlete: {'is_sports_category_granted': id === 1}
                                });
                            }}
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
                                state.athlete.is_doping_check_passed !== null
                                    ? (state.athlete.is_doping_check_passed ? 1 : 2)
                                    : null
                            }
                            setSelectedOptionId={(id) => {
                                modalDispatch({
                                    mode: 'UPDATE_ATHLETE_DATA',
                                    athlete: {'is_doping_check_passed': id === 1}
                                });
                            }}
                            style={{width: '100%'}}
                        />
                    </div>
                </div>
            </div>
            <div style={{flexDirection: 'row', display: 'flex', gap: '10px', marginTop: '5px'}}>
                <Button
                    style={{height: '44px', padding: '10px 20px', width: '100%'}}
                    onClick={async () => modalDispatch({mode: 'OPEN_CHECK_DOPING_MENU'})}
                    disabled={state.athlete.birth_date === ''}
                >
                    Проверить на допинг
                </Button>
                <Button
                    style={{height: '44px', padding: '10px 20px', width: '100%'}}
                    onClick={async () => modalDispatch({mode: 'OPEN_CHECK_RESULT_MENU'})}
                    disabled={
                        state.athlete.sport_id === null
                        || data.modules.filter(module => module.sport_id === state.athlete.sport_id).length === 0
                    }
                >
                    Проверить по результату
                </Button>
            </div>
            {
                !('id' in state.athlete) && (
                    <Button
                        style={{height: '44px', padding: '10px 20px'}}
                        onClick={createOnClick}
                        disabled={!Object.values(state.athlete).every(val => val !== null && val !== '')}
                    >
                        Создать атлета
                    </Button>
                )
            }
        </div>
    );
}

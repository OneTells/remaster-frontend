import React, {use} from "react";

import {DefaultAthleteType, ModalContext} from "@/app/document/_context/modal-context.tsx";
import {AthleteType, DocumentType, SportType} from "@/app/document/_types.tsx";
import {Button} from "@/_ui/button/Button.tsx";
import {ActionBar} from "@/app/document/_modal/DopingAthletesModal/_components/action-bar/ActionBar.tsx";
import {Doping} from "@/app/document/_modal/DopingAthletesModal/_components/doping/Doping.tsx";
import {updateCheckerData} from "@/app/document/_api.tsx";
import {useEffectIgnoreFirstRender} from "@/_hook/useEffectIgnoreFirstRender.tsx";
import {useNavigationData} from "@/_hook/useNavigationData.tsx";
import {DopingAthleteType} from "@/app/doping-athletes/_types.tsx";


type Props = {
    athlete: DefaultAthleteType | AthleteType;
    setAthlete: React.Dispatch<React.SetStateAction<DefaultAthleteType | AthleteType>>;
}

export function DopingAthletesModal({athlete, setAthlete}: Props) {
    const data = useNavigationData<{ sports: SportType[], document: DocumentType, dopingAthletes: DopingAthleteType[] }>();

    const [state, modalDispatch] = use(ModalContext);

    if (state.mode !== 'CHECK_DOPING_MENU')
        throw new Error('Unexpected mode: ' + state.mode);

    useEffectIgnoreFirstRender(() => {
        if (!('id' in state.athlete)) return;

        const timer = setTimeout(() => {
            (async () => {
                await updateCheckerData('doping', (state.athlete as AthleteType).id, state.dopingCheckerData)
            })();
        }, 500);

        return () => clearTimeout(timer);
    }, [state.dopingCheckerData]);

    const setSelectId = (selectId: number | null) => {
        modalDispatch({
            mode: 'UPDATE_DATA_IN_DOPING_MENU',
            dopingCheckerData: {...state.dopingCheckerData, selectId: selectId}
        });
    }

    const setName = (name: string) => {
        modalDispatch({
            mode: 'UPDATE_DATA_IN_DOPING_MENU',
            dopingCheckerData: {...state.dopingCheckerData, full_name: name, selectId: null}
        });
    }

    const cancelOnClick = () => {
        modalDispatch({mode: 'OPEN_EDIT_MENU'});
    }

    const saveOnClick = async () => {
        setAthlete(value => ({...value, is_doping_check_passed: state.dopingCheckerData.selectId === null}));
        modalDispatch({mode: 'OPEN_EDIT_MENU'});
    };

    const filteredAthletes = data.dopingAthletes.filter(dopingAthlete => {
        const matchesName = !state.dopingCheckerData.full_name
            || dopingAthlete.full_name.toLowerCase().includes(state.dopingCheckerData.full_name.toLowerCase());

        const matchesDate = !athlete.birth_date
            || (dopingAthlete.birth_date
                && (dopingAthlete.birth_date === new Date(athlete.birth_date).toLocaleDateString('ru-RU'))
            );

        return matchesName && matchesDate;
    });

    return (
        <div style={{width: 'calc(90vw - 75px)'}}>
            <ActionBar
                name={state.dopingCheckerData.full_name}
                setName={setName}
                date={athlete.birth_date}
            />
            <Doping
                dopingAthletes={filteredAthletes}
                setSelectId={setSelectId}
                selectId={state.dopingCheckerData.selectId}
            />
            <div style={{display: 'flex', gap: '10px'}}>
                <p>Тест на допинг:</p>
                <p style={{color: state.dopingCheckerData.selectId === null ? '#4CAF50' : '#f44336'}}>
                    {
                        state.dopingCheckerData.selectId === null
                            ? 'Отрицательный'
                            : 'Положительный'
                    }
                </p>
                <div style={{display: 'flex', justifyContent: 'flex-end', gap: '10px', flex: 1}}>
                    <Button
                        style={{height: '44px', padding: '10px 20px'}}
                        onClick={cancelOnClick}
                    >
                        Назад
                    </Button>
                    <Button
                        style={{height: '44px', padding: '10px 20px'}}
                        onClick={saveOnClick}
                    >
                        Сохранить
                    </Button>
                </div>
            </div>
        </div>
    )
}
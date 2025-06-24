import {use} from "react";

import {ModalContext} from "@/app/document/_context/modal-context.tsx";
import {DocumentType, SportType} from "@/app/document/_types.tsx";
import {Button} from "@/_ui/button/Button.tsx";
import {ActionBar} from "@/app/document/_modal/DopingAthletesModal/_components/action-bar/ActionBar.tsx";
import {Doping} from "@/app/document/_modal/DopingAthletesModal/_components/doping/Doping.tsx";
import {useNavigationData} from "@/_hook/useNavigationData.tsx";
import {DopingAthleteType} from "@/app/doping-athletes/_types.tsx";


export function DopingAthletesModal() {
    const data = useNavigationData<{ sports: SportType[], document: DocumentType, dopingAthletes: DopingAthleteType[] }>();

    const [state, modalDispatch] = use(ModalContext);

    if (state.mode !== 'CHECK_DOPING_MENU')
        throw new Error('Unexpected mode: ' + state.mode);

    const setSelectId = (selectId: number | null) => {
        modalDispatch({
            mode: 'UPDATE_DATA_IN_DOPING_MENU',
            dopingCheckerData: {selectId: selectId}
        });
    }

    const setName = (name: string) => {
        modalDispatch({
            mode: 'UPDATE_DATA_IN_DOPING_MENU',
            dopingCheckerData: {full_name: name, selectId: null}
        });
    }

    const cancelOnClick = () => {
        modalDispatch({mode: 'OPEN_EDIT_MENU'});
    }

    const saveOnClick = async () => {
        modalDispatch({
            mode: 'UPDATE_ATHLETE_DATA',
            athlete: {'is_doping_check_passed': state.athlete.doping_data.selectId === null}
        });
        modalDispatch({mode: 'OPEN_EDIT_MENU'});
    };

    const filteredAthletes = data.dopingAthletes.filter(dopingAthlete => {
        const matchesName = !state.athlete.doping_data.full_name
            || dopingAthlete.full_name.toLowerCase().includes(state.athlete.doping_data.full_name.toLowerCase());

        const matchesDate = !state.athlete.birth_date
            || (dopingAthlete.birth_date
                && (dopingAthlete.birth_date === new Date(state.athlete.birth_date).toLocaleDateString('ru-RU'))
            );

        return matchesName && matchesDate;
    });

    return (
        <div style={{width: 'calc(90vw - 75px)'}}>
            <ActionBar
                name={state.athlete.doping_data.full_name}
                setName={setName}
                date={state.athlete.birth_date}
            />
            <Doping
                dopingAthletes={filteredAthletes}
                setSelectId={setSelectId}
                selectId={state.athlete.doping_data.selectId}
            />
            <div style={{display: 'flex', gap: '10px'}}>
                <p>Тест на допинг:</p>
                <p style={{color: state.athlete.doping_data.selectId === null ? '#4CAF50' : '#f44336'}}>
                    {
                        state.athlete.doping_data.selectId === null
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
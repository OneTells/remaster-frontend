import React, {use, useEffect, useState} from "react";

import {DefaultAthleteType, ModalContext} from "@/app/document/_context/modal-context.tsx";
import {AthleteType} from "@/app/document/_types.tsx";
import {Button} from "@/_ui/button/Button.tsx";
import {DopingAthleteType, FiltersType} from "@/app/doping-athletes/_types.tsx";
import {ActionBar} from "@/app/document/_modal/DopingAthletesModal/_components/action-bar/ActionBar.tsx";
import {Doping} from "@/app/document/_modal/DopingAthletesModal/_components/doping/Doping.tsx";


type Props = {
    athlete: DefaultAthleteType | AthleteType;
    dopingAthletes: DopingAthleteType[];

    setAthlete: React.Dispatch<React.SetStateAction<DefaultAthleteType | AthleteType>>;
}

export function DopingAthletesModal({athlete, dopingAthletes, setAthlete}: Props) {
    const [_, modalDispatch] = use(ModalContext);
    const [selectId, setSelectId] = useState<number | null>(null);

    const [filters, setFilters] = useState<FiltersType>({name: '', date: athlete.birth_date});

    const cancelOnClick = () => {
        modalDispatch({mode: 'OPEN_EDIT_MENU'});
    }

    const saveOnClick = async () => {
        setAthlete(value => ({...value, is_doping_check_passed: selectId === null}));
        modalDispatch({mode: 'OPEN_EDIT_MENU'});
    };

    useEffect(() => {
        setSelectId(null);
    }, [filters]);

    const filteredAthletes = dopingAthletes.filter(dopingAthlete => {
        const matchesName = !filters.name
            || dopingAthlete.full_name.toLowerCase().includes(filters.name.toLowerCase());

        const matchesDate = !filters.date
            || (dopingAthlete.birth_date
                && (dopingAthlete.birth_date === new Date(filters.date).toLocaleDateString('ru-RU'))
            );

        return matchesName && matchesDate;
    });

    return (
        <div style={{width: 'calc(90vw - 75px)'}}>
            <ActionBar
                filters={filters}
                setFilters={setFilters}
            />
            <Doping
                dopingAthletes={filteredAthletes}
                setSelectId={setSelectId}
                selectId={selectId}
            />
            <div style={{display: 'flex', gap: '10px'}}>
                <p>
                    Тест на допинг:
                </p>
                <p style={{color: selectId === null ? '#4CAF50' : '#f44336'}}>
                    {
                        selectId === null
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
'use client'

import {memo, useEffect, useState} from "react";

import {DopingAthleteType, FiltersType} from "@/app/doping-athletes/_types.tsx";
import {getDopingAthletes} from "@/app/doping-athletes/_api.tsx";
import {ActionBar} from "@/app/doping-athletes/_components/action-bar/ActionBar.tsx";
import {Doping} from "@/app/doping-athletes/_components/doping/Doping.tsx";
import {useNavigationData} from "@/_hook/useNavigationData.tsx";


export const DopingAthletesPage = memo(function DopingAthletesPage() {
    const data = useNavigationData<DopingAthleteType[]>();
    return <Menu dopingAthletes={data}/>;
})

export function Menu(props: { dopingAthletes: DopingAthleteType[] }) {
    const [dopingAthletes, setDopingAthletes] = useState<DopingAthleteType[]>(props.dopingAthletes);
    const [filters, setFilters] = useState<FiltersType>({name: '', date: ''});

    useEffect(() => {
        (async () => {
            const data = await getDopingAthletes();
            setDopingAthletes(data);
        })();
    }, []);

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
        <>
            <ActionBar filters={filters} setFilters={setFilters}/>
            <Doping dopingAthletes={filteredAthletes}/>
        </>
    );
}

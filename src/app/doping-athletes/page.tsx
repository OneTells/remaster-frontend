'use client'

import {memo, useEffect, useState} from "react";

import {DopingAthleteType} from "@/app/doping-athletes/_types.tsx";
import {getDopingAthletes} from "@/app/doping-athletes/_api.tsx";
import {ActionBar} from "@/app/doping-athletes/_components/action-bar/ActionBar.tsx";
import {Doping} from "@/app/doping-athletes/_components/doping/Doping.tsx";
import {useNavigationData} from "@/_hook/useNavigationData.tsx";


export const DopingAthletesPage = memo(function DopingAthletesPage() {
    const data = useNavigationData();
    return <Menu dopingAthletes={data as DopingAthleteType[]}/>;
})

export function Menu(props: {dopingAthletes: DopingAthleteType[]}) {
    const [dopingAthletes, setDopingAthletes] = useState<DopingAthleteType[]>(props.dopingAthletes);
    const [filters, setFilters] = useState({
        fullName: '',
        birthDate: ''
    });

    useEffect(() => {
        (async () => {
            const data = await getDopingAthletes();
            setDopingAthletes(data);
        })();
    }, []);

    const filteredAthletes = dopingAthletes.filter(dopingAthlete => {
        const matchesName = !filters.fullName ||
            dopingAthlete.full_name.toLowerCase().includes(filters.fullName.toLowerCase());
        const matchesDate = !filters.birthDate ||
            (dopingAthlete.birth_date &&
                new Date(dopingAthlete.birth_date).toLocaleDateString('ru-RU') === filters.birthDate.toLocaleDateString('ru-RU'));
        return matchesName && matchesDate;
    });

    return (
        <>
            <ActionBar
                onNameChange={(name) => setFilters(prev => ({...prev, fullName: name}))}
                onDateChange={(date) => setFilters(prev => ({...prev, birthDate: date}))}
            />
            <Doping dopingAthletes={filteredAthletes}/>
        </>
    );
}

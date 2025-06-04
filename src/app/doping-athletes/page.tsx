'use client'

import {useEffect, useState} from "react";

import {DopingAthleteType} from "@/app/doping-athletes/_types.tsx";
import {getDopingAthletes} from "@/app/doping-athletes/_api.tsx";
import {ActionBar} from "@/app/doping-athletes/_components/action-bar/ActionBar.tsx";
import {Doping} from "@/app/doping-athletes/_components/doping/Doping.tsx";


export default function Page() {
    const [dopings, setDopings] = useState<DopingAthleteType[]>([]);
    const [filters, setFilters] = useState({
        fullName: '',
        birthDate: ''
    });

    useEffect(() => {
        (async () => {
            const data = await getDopingAthletes();
            setDopings(data);
        })();
    }, []);

    // Фильтрация данных при изменении фильтров
    const filteredDopings = dopings.filter(doping => {
        const matchesName = doping.fullName.toLowerCase().includes(filters.fullName.toLowerCase());
        const matchesDate = !filters.birthDate || doping.birthDate === filters.birthDate;
        return matchesName && matchesDate;
    });

    return (
        <>
            <ActionBar
                onNameChange={(name) => setFilters(prev => ({...prev, fullName: name}))}
                onDateChange={(date) => setFilters(prev => ({...prev, birthDate: date}))}
            />
            <Doping dopingAthletes={filteredDopings}/>
        </>
    );
}

'use client'

import { useEffect, useState } from "react";
import { getDopings } from "@/app/doping/_api.tsx";
import { DopingType } from "./_types";
import ActionBar from "@/app/doping/_components/action-bar/ActionBar.tsx";
import { Doping } from "@/app/doping/_components/doping/Doping.tsx";

export default function Page() {
    const [dopings, setDopings] = useState<DopingType[]>([]);
    const [filters, setFilters] = useState({
        fullName: '',
        birthDate: null as Date | null
    });

    useEffect(() => {
        (async () => {
            const data = await getDopings();
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
        <div>
            <ActionBar 
                onNameChange={(name) => setFilters(prev => ({...prev, fullName: name}))}
                onDateChange={(date) => setFilters(prev => ({...prev, birthDate: date}))}
            />
            <Doping dopings={filteredDopings} />
        </div>
    );
}
import styles from "./ActionBar.module.css";

import React from "react";
import {FiltersType} from "@/app/doping-athletes/_types.tsx";


type Props = {
    filters: FiltersType;
    setFilters: React.Dispatch<React.SetStateAction<FiltersType>>;
}

export function ActionBar({filters, setFilters}: Props) {
    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFilters(prev => ({...prev, name: e.target.value}));
    };

    const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFilters(prev => ({...prev, date: e.target.value}));
    };

    return (
        <div className={styles["container"]}>
            <div>
                <p>ФИО</p>
                <input
                    style={{width: "340px"}}
                    type="text"
                    value={filters.name}
                    onChange={handleNameChange}
                />
            </div>
            <div>
                <p>Дата рождения</p>
                <input
                    type="date"
                    max={new Date().toISOString().split('T')[0]}
                    value={filters.date}
                    onChange={handleDateChange}
                    style={{height: "44px", paddingRight: "10px"}}
                    disabled
                />
            </div>
        </div>
    );
}

import styles from "./ActionBar.module.css";

import React, { useState } from "react";


type Props = {
    onNameChange: (name: string) => void;
    onDateChange: (date: string) => void;
}

export function ActionBar({ onNameChange, onDateChange }: Props) {
    const [name, setName] = useState('');
    const [_, setDate] = useState('');

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newName = e.target.value;
        setName(newName);
        onNameChange(newName);
    };

    const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newDate = e.target.value;
        setDate(newDate);
        onDateChange(newDate);
    };

    return (
        <div className={styles["container"]}>
            <div>
                <p>ФИО</p>
                <input
                    type="text" 
                    value={name}
                    onChange={handleNameChange}
                />
            </div>
            <div>
                <p>Дата рождения</p>
                <input type="date" onChange={handleDateChange}/>
            </div>
        </div>
    );
}

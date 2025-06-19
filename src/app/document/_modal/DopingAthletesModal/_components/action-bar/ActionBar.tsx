import styles from "./ActionBar.module.css";

import React from "react";


type Props = {
    name: string;
    setName: (name: string) => void;

    date: string;
}

export function ActionBar({name, setName, date}: Props) {
    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value);
    };

    return (
        <div className={styles["container"]}>
            <div>
                <p>ФИО</p>
                <input
                    style={{width: "340px"}}
                    type="text"
                    value={name}
                    onChange={handleNameChange}
                />
            </div>
            <div>
                <p>Дата рождения</p>
                <input
                    type="date"
                    max={new Date().toISOString().split('T')[0]}
                    value={date}
                    style={{height: "44px", paddingRight: "10px"}}
                    disabled
                />
            </div>
        </div>
    );
}

import styles from "./DateInput.module.css";

import React from "react";


type Props = {
    data: string;
    setData: (data: string) => void;
    style?: React.CSSProperties;
};

export function DateInput({data, setData, style}: Props) {
    const today = new Date().toISOString().split('T')[0];

    const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedDate = e.target.value;

        if (selectedDate <= today) {
            setData(selectedDate);
        }
    };

    return (
        <input
            type="date"
            max={today}
            value={data}
            onChange={handleDateChange}
            className={styles['container']}
            style={style}
            onKeyDown={(e) => e.preventDefault()}
            onPaste={(e) => e.preventDefault()}
        />
    );
}

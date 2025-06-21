import styles from "./DateInput.module.css";

import React from "react";


type Props = {
    data: string;
    setData: (data: string) => void;
    style?: React.CSSProperties;
};

export function DateInput({data, setData, style}: Props) {
    return (
        <input
            type="date"
            max={new Date().toISOString().split('T')[0]}
            value={data}
            onChange={(e) => setData(e.target.value)}
            className={styles['container']}
            style={style}
        />
    );
}

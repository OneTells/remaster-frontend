import styles from './NumberInput.module.css';

import React from "react";


type Props = {
    data: number | undefined;
    setData: (data: string) => void;
    style?: React.CSSProperties;
};

export function NumberInput({data, setData, style}: Props) {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;

        if (/^[0-9]{0,6}$/.test(value)) {
            setData(value);
        }
    };

    return (
        <input
            type="text"
            value={data}
            onChange={handleChange}
            className={styles['container']}
            style={style}
        />
    );
}

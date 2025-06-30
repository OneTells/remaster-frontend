import styles from './NumberInput.module.css';

import React from "react";


type Props = {
    data: number | string | undefined;
    setData: (data: string) => void;
    style?: React.CSSProperties;
    disabled?: boolean;
    allowDecimal?: boolean;
};

export function NumberInput({data, setData, style, disabled = false, allowDecimal = false}: Props) {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        const pattern = allowDecimal ? /^\d*\.?\d{0,2}$/ : /^[0-9]{0,6}$/;

        if (pattern.test(value)) {
            setData(value);
        }
    };

    return (
        <input
            type="text"
            value={data}
            onChange={handleChange}
            className={`${styles.container} ${disabled ? styles.disabled : ''}`}
            style={style}
            disabled={disabled}
        />
    );
}

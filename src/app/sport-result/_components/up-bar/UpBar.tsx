import styles from "./UpBar.module.css";
import {Dispatch, SetStateAction} from "react";
import {Select} from "@/_ui/select/Select.tsx";
// import React, { useState } from "react";


const options = [
    {id: 1, label: 'Лёгкая атлетика'},
    {id: 2, label: 'Плаванье'},
    {id: 3, label: 'Cпортивное программирование'},
];

type Props = {
    sportType: number | null,
    setsportType: Dispatch<SetStateAction<number | null>>,
}

export function UpBar(props: Props) {
    return (
        <div className={styles["container"]}>
            <div>
                <p>Вид спорта</p>
                <Select options={options} selectedOptionId={props.sportType} setSelectedOptionId={props.setsportType}/>
            </div>
        </div>
    );
}

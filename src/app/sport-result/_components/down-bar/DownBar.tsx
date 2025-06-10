import styles from "./DownBar.module.css";
import {Select} from "@/_ui/select/Select.tsx";
import {Dispatch, SetStateAction} from "react";
// import React, { useState } from "react";

const options = [
    {id: 2, label: '1 спортивный'},
    {id: 1, label: 'КМС'},
];

type Props = {
    name: string,
    sportsRankId: number,
    setSportsRankId: Dispatch<SetStateAction<number>>,
}

export function DownBar(props: Props) {
    
    return (
        <div className={styles["container"]}>
            <div>
                <p>Спортивный разряд</p>
                <Select options={options} selectedOptionId={props.sportsRankId} setSelectedOptionId={props.setSportsRankId}/>
            </div>
            <div>
                <p>Причина отказа</p>
                <input
                    type="text" 
                />
            </div>
        </div>
    );
}

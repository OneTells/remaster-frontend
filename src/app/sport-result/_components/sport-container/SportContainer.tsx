import styles from "./SportContainer.module.css"

import React from "react";

import {Athletics} from "@/app/sport-result/_sports/athletics/Athletics.tsx";
import {SportsProgramming} from "@/app/sport-result/_sports/sports-programming/SportsProgramming.tsx";
import {checkResult, getSportData} from "@/app/sport-result/_api.tsx";
import {ComputerSports} from "@/app/sport-result/_sports/computer-sports/ComputerSports.tsx";


type Props = {
    data: { sportCategoryId: number | null, sportId: number | null, sportData: Awaited<ReturnType<typeof getSportData>> | null };
    setIsDopingCheckPassed: React.Dispatch<React.SetStateAction<boolean | null>>
}

export function SportContainer(props: Props) {
    if (props.data.sportCategoryId === null)
        return <div style={{height: '100%'}}/>

    const setIsDopingCheckPassed = async (data: any) => {
        const isSportsCategoryGranted = await checkResult(props.data.sportId!, data)
        props.setIsDopingCheckPassed(isSportsCategoryGranted)
    };

    return (
        <div className={styles["container"]}>
            {props.data.sportId === 1 && <Athletics data={props.data} setIsDopingCheckPassed={setIsDopingCheckPassed}/>}
            {props.data.sportId === 2 && <SportsProgramming data={props.data} setIsDopingCheckPassed={setIsDopingCheckPassed}/>}
            {props.data.sportId === 3 && <ComputerSports data={props.data as any} setIsDopingCheckPassed={setIsDopingCheckPassed}/>}
        </div>
    );
}

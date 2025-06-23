import styles from "./SportContainer.module.css"

import React, {useEffect} from "react";

import {AthleticsPlace} from "@/app/sport-result/_sports/athletics-place/AthleticsPlace.tsx";
import {SportsProgramming} from "@/app/sport-result/_sports/sports-programming/SportsProgramming.tsx";
import {checkResult, getModuleData} from "@/app/sport-result/_api.tsx";
import {ComputerSports} from "@/app/sport-result/_sports/computer-sports/ComputerSports.tsx";
import {ModuleType} from "@/app/document/_types.tsx";
import {AthleticsResult} from "@/app/sport-result/_sports/athletics-result/AthleticsResult.tsx";


type Props = {
    data: {
        sportCategoryId: number | null,
        module: ModuleType | null,
        moduleData: Awaited<ReturnType<typeof getModuleData>> | null
    };
    setIsDopingCheckPassed: React.Dispatch<React.SetStateAction<boolean | null>>
}

export function SportContainer(props: Props) {
    if (props.data.sportCategoryId === null)
        return <div style={{height: '100%'}}/>

    const sendDataForCheck = async (data: any | null) => {
        if (data === null) {
            props.setIsDopingCheckPassed(null)
            return
        }

        const isSportsCategoryGranted = await checkResult(props.data.module!.id, data)
        props.setIsDopingCheckPassed(isSportsCategoryGranted)
    };

    useEffect(() => {
        props.setIsDopingCheckPassed(null);
    }, [props.data.module?.id])

    return (
        <div className={styles["container"]}>
            {props.data.module?.id === 1 &&
                <AthleticsResult data={props.data as any} sendDataForCheck={sendDataForCheck} key={props.data.module?.id}/>}
            {props.data.module?.id === 2 &&
                <AthleticsPlace data={props.data as any} sendDataForCheck={sendDataForCheck} key={props.data.module?.id}/>}
            {props.data.module?.id === 3 &&
                <SportsProgramming data={props.data as any} sendDataForCheck={sendDataForCheck} key={props.data.module?.id}/>}
            {props.data.module?.id === 4 &&
                <ComputerSports data={props.data as any} sendDataForCheck={sendDataForCheck} key={props.data.module?.id}/>}
        </div>
    );
}

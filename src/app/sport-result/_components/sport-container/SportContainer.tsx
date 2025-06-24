import styles from "./SportContainer.module.css"

import {AthleticsPlace} from "@/app/sport-result/_sports/athletics-place/AthleticsPlace.tsx";
import {SportsProgramming} from "@/app/sport-result/_sports/sports-programming/SportsProgramming.tsx";
import {ComputerSports} from "@/app/sport-result/_sports/computer-sports/ComputerSports.tsx";
import {AthleticsResult} from "@/app/sport-result/_sports/athletics-result/AthleticsResult.tsx";
import {getModuleData} from "@/app/sport-result/_api.tsx";
import {ModuleType} from "@/app/document/_types.tsx";


type Props = {
    module: ModuleType | null;
    sportCategoryId: number | null;

    initData: Awaited<ReturnType<typeof getModuleData>> | null;

    state: any;
    updateState: (state: any) => void;

    sendDataForCheck: (data: any | null) => Promise<void>;
}

export function SportContainer(props: Props) {
    if (props.sportCategoryId === null || props.module === null || props.initData === null)
        return <div style={{height: '100%'}}/>

    return (
        <div className={styles["container"]}>
            {
                props.module.id === 1 &&
                // @ts-ignore
                <AthleticsResult {...props} key={`${props.module.id}-${props.sportCategoryId}`}/>
            }
            {
                props.module.id === 2 &&
                // @ts-ignore
                <AthleticsPlace {...props} key={`${props.module.id}-${props.sportCategoryId}`}/>
            }
            {
                props.module.id === 3 &&
                // @ts-ignore
                <SportsProgramming {...props} key={`${props.module.id}-${props.sportCategoryId}`}/>
            }
            {
                props.module.id === 4 &&
                // @ts-ignore
                <ComputerSports {...props} key={`${props.module.id}-${props.sportCategoryId}`}/>
            }
        </div>
    );
}

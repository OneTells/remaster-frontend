import styles from "./ActionBar.module.css";

import {Dispatch, SetStateAction} from "react";

import {UploadIcon} from "@/_assets/upload_icon";
import {RemoveIcon} from "@/_assets/remove_icon";
import {deleteDocument} from "@/app/documents/_api.tsx";


type Props = {
    selectIDs: Set<number>,
    setSelectIDs: Dispatch<SetStateAction<Set<number>>>
    setNeedUpdate: Dispatch<SetStateAction<boolean>>
}

export function ActionBar(props: Props) {
    const removeOnClick = async () => {
        await deleteDocument(props.selectIDs);
        props.setSelectIDs(new Set());
        props.setNeedUpdate(true);
    }

    return (
        <div className={styles["container"]}>
            <button>Новый документ</button>
            <div>
                <UploadIcon/>
            </div>
            <div onClick={removeOnClick}>
                <RemoveIcon/>
            </div>
        </div>
    )
}
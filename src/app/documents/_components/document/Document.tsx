import styles from "./Document.module.css";

import {Dispatch, SetStateAction} from "react";
import {Link} from "react-router";

import {CheckBox} from "@/app/documents/_components/check-box/CheckBox.tsx";
import {DocumentType} from "@/app/documents/_types.tsx";


type Props = {
    document: DocumentType,
    selectIDs: Set<number>,
    setSelectIDs: Dispatch<SetStateAction<Set<number>>>
}

export function Document(props: Props) {
    const onChange = () => {
        props.setSelectIDs((value) => {
            const newSet = new Set(value);

            if (props.selectIDs.has(props.document.id)) {
                newSet.delete(props.document.id);
            } else {
                newSet.add(props.document.id);
            }

            return newSet;
        });
    }

    return (
        <div className={styles['container']}>
            <CheckBox onChange={onChange} checked={props.selectIDs.has(props.document.id)}/>
            <Link to={`/_documents/${props.document.id}`}>
                <div className={styles['text']}>
                    {props.document.title}
                </div>
            </Link>
        </div>

    )
}
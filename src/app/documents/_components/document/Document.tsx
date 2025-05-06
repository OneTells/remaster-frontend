import styles from "./Document.module.css";

import {Dispatch, MouseEvent, SetStateAction, useRef} from "react";
import {useNavigate} from "react-router";

import {CheckBox} from "@/app/documents/_components/check-box/CheckBox.tsx";
import {DocumentType} from "@/app/documents/_types.tsx";


type Props = {
    document: DocumentType,
    selectIDs: Set<number>,
    setSelectIDs: Dispatch<SetStateAction<Set<number>>>
}

export function Document(props: Props) {
    const ref = useRef<HTMLDivElement>(null)
    const navigate = useNavigate();

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

    const onDoubleClick = (event: MouseEvent<HTMLInputElement>) => {
        if (event.target === ref.current || ref.current!.contains(event.target as Node))
            return

        navigate(`/_documents/${props.document.id}`);
    }

    return (
        <div className={styles['container']} onDoubleClick={onDoubleClick}>
            <CheckBox onChange={onChange} checked={props.selectIDs.has(props.document.id)} ref={ref}/>
            <div className={styles['text']}>
                {props.document.title}
            </div>
        </div>

    )
}
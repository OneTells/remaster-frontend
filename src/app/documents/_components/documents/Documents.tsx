import styles from "./Documents.module.css";

import {Dispatch, SetStateAction} from "react";

import {Document} from "@/app/documents/_components/document/Document";
import {DocumentType} from "@/app/documents/_types.tsx";


type Props = {
    documents: DocumentType[],
    selectIDs: Set<number>,
    setSelectIDs: Dispatch<SetStateAction<Set<number>>>
}

export function Documents(props: Props) {
    return (
        <div className={`${styles['container']} ${styles["scroll-container"]}`}>
            {
                props.documents.map((document, index) => (
                    <Document
                        key={index}
                        document={document}
                        selectIDs={props.selectIDs}
                        setSelectIDs={props.setSelectIDs}
                    />
                ))
            }
        </div>
    )
}
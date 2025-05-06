'use client'

import {use, useEffect, useState} from "react";

import {getDocuments} from "@/app/documents/_api.tsx";
import {DocumentType} from "@/app/documents/_types.tsx";
import {ActionBar} from "@/app/documents/_components/action-bar/ActionBar.tsx";
import {Documents} from "@/app/documents/_components/documents/Documents.tsx";


export default function Page() {
    const documents = use(getDocuments());
    return <Menu documents={documents}/>
}

function Menu(props: { documents: DocumentType[] }) {
    const [documents, setDocuments] = useState<DocumentType[]>(props.documents);

    const [selectIDs, setSelectIDs] = useState<Set<number>>(new Set());
    const [needUpdate, setNeedUpdate] = useState<boolean>(false);

    useEffect(() => {
        if (!needUpdate)
            return

        (async () => {
            const documents = await getDocuments()
            setDocuments(documents)
            setNeedUpdate(false);
        })()
    }, [needUpdate]);

    return (
        <>
            <ActionBar selectIDs={selectIDs} setSelectIDs={setSelectIDs} setNeedUpdate={setNeedUpdate}/>
            <Documents documents={documents} selectIDs={selectIDs} setSelectIDs={setSelectIDs}/>
        </>
    )
}

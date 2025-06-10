'use client'

import {memo, useEffect, useState} from "react";

import {getDocuments} from "@/app/documents/_api.tsx";
import {DocumentType} from "@/app/documents/_types.tsx";
import {ActionBar} from "@/app/documents/_components/action-bar/ActionBar.tsx";
import {Documents} from "@/app/documents/_components/documents/Documents.tsx";
import {useNavigationData} from "@/_hook/useNavigationData.tsx";


export const DocumentsPage = memo(function DocumentsPage() {
    const data = useNavigationData<DocumentType[]>();
    return <Menu documents={data as DocumentType[]}/>
})

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

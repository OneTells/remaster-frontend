'use client'

import {memo, useState} from "react";

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

    const update = async () => {
        const documents = await getDocuments()
        setDocuments(documents)
    }

    return (
        <>
            <ActionBar selectIDs={selectIDs} setSelectIDs={setSelectIDs} update={update}/>
            <Documents documents={documents} selectIDs={selectIDs} setSelectIDs={setSelectIDs}/>
        </>
    )
}

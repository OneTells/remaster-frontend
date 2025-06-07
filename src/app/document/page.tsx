'use client'

import {useParams} from "react-router";
import {memo, use, useEffect, useState} from "react";

import {getDocument, updateDocument} from "@/app/document/_api.tsx";
import {AthleteType, DocumentType} from "@/app/document/_types.tsx";
import {ActionBar} from "@/app/document/_components/action-bar/ActionBar.tsx";
import {AthletesTable} from "@/app/document/_components/athletes-table/AthletesTable.tsx";
import ComponentYouSelected from "@/app/document/_modal/components/ComponentYouSelected";
import ModalContextProvider, {ModalContext} from "@/app/document/_context/modal-context.tsx";
import {useNavigationData} from "@/_hook/useNavigationData.tsx";


export const DocumentPage = memo(function DocumentPage() {
    const {id} = useParams()
    const data = useNavigationData();

    return (
        <ModalContextProvider>
            <Menu id={parseInt(id!)} document={data as DocumentType}/>
        </ModalContextProvider>
    )
})

function Menu(props: { id: number, document: DocumentType }) {
    const [name, setName] = useState<string>(props.document.title);
    const [sportsRankId, setSportsRankId] = useState<number | null>(props.document.sports_category_id);
    const [athletes, setAthletes] = useState<AthleteType[]>(props.document.athletes);

    const [selectIDs, setSelectIDs] = useState<Set<number>>(new Set());
    const [needUpdate, setNeedUpdate] = useState<boolean>(false);

    const [modalState] = use(ModalContext)

    useEffect(() => {
        if (!needUpdate)
            return

        (async () => {
            const document = await getDocument(props.id)
            setName(document.title)
            setSportsRankId(document.sports_category_id)
            setAthletes(document.athletes)

            setNeedUpdate(false);
        })()
    }, [needUpdate]);

    useEffect(() => {
        const timer = setTimeout(() => {
            (async () => {
                await updateDocument(props.id, name, sportsRankId!);
            })();
        }, 1000);
        
        return () => clearTimeout(timer);
    }, [name, sportsRankId, props.id]);

    return (
        <>
            <ActionBar
                id={props.id}
                name={name}
                setName={setName}
                sportsRankId={sportsRankId}
                setSportsRankId={setSportsRankId}
                selectIDs={selectIDs}
                setSelectIDs={setSelectIDs}
                setNeedUpdate={setNeedUpdate}
            />
            <AthletesTable
                athletes={athletes}
                selectIDs={selectIDs}
                setSelectIDs={setSelectIDs}
            />
            {modalState.isOpen && <ComponentYouSelected setNeedUpdate={setNeedUpdate} documentId={props.id}/>}
        </>
    );
}

'use client'

import {memo, use, useEffect, useState} from "react";

import {getDocument, updateDocument} from "@/app/document/_api.tsx";
import {DocumentType, SportType} from "@/app/document/_types.tsx";
import {ActionBar} from "@/app/document/_components/action-bar/ActionBar.tsx";
import {AthletesTable} from "@/app/document/_components/athletes-table/AthletesTable.tsx";
import ComponentYouSelected from "@/app/document/_modal/components/ComponentYouSelected";
import ModalContextProvider, {ModalContext} from "@/app/document/_context/modal-context.tsx";
import {useNavigationData} from "@/_hook/useNavigationData.tsx";


export const DocumentPage = memo(function DocumentPage() {
    const data = useNavigationData<{ sports: SportType[], document: DocumentType }>();

    return (
        <ModalContextProvider>
            <Menu document={data.document} sports={data.sports}/>
        </ModalContextProvider>
    )
})

function Menu(props: { document: DocumentType, sports: SportType[] }) {
    const [document, setDocument] = useState<DocumentType>(props.document);

    const [selectIDs, setSelectIDs] = useState<Set<number>>(new Set());
    const [needUpdate, setNeedUpdate] = useState<boolean>(false);

    const [modalState, modalDispatch] = use(ModalContext)

    useEffect(() => {
        if (!needUpdate)
            return

        (async () => {
            const document_ = await getDocument(document.id)
            setDocument(document_)

            setNeedUpdate(false);
        })()
    }, [needUpdate]);

    useEffect(() => {
        const timer = setTimeout(() => {
            (async () => {
                await updateDocument(document.id, document.title, document.sports_category_id!);
            })();
        }, 100);

        return () => clearTimeout(timer);
    }, [document.title, document.sports_category_id]);

    const athleteModalOpen = (id: number) => {
        return () => modalDispatch({type: 'OPEN', data: document.athletes.find((athlete) => athlete.id === id)})
    };

    return (
        <>
            <ActionBar
                document={document}
                setDocument={setDocument}
                selectIDs={selectIDs}
                setSelectIDs={setSelectIDs}
                setNeedUpdate={setNeedUpdate}
            />
            <AthletesTable
                athletes={document.athletes}
                sports={props.sports}
                selectIDs={selectIDs}
                setSelectIDs={setSelectIDs}
                athleteModalOpen={athleteModalOpen}
            />
            {modalState.isOpen && <ComponentYouSelected setNeedUpdate={setNeedUpdate} documentId={props.document.id}/>}
        </>
    );
}

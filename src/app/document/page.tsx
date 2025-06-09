'use client'

import {memo, use, useEffect, useState} from "react";
import {open, save} from "@tauri-apps/plugin-dialog";

import {
    createOrder,
    downloadAthletes,
    downloadDocument,
    getDocument,
    removeAthletes,
    updateDocument,
    uploadAthletes
} from "@/app/document/_api.tsx";
import {DocumentType, SportType} from "@/app/document/_types.tsx";
import {ActionBar} from "@/app/document/_components/action-bar/ActionBar.tsx";
import {AthletesTable} from "@/app/document/_components/athletes-table/AthletesTable.tsx";
import {AthleteModal} from "@/app/document/_modal/components/AthleteModal/AthleteModal.tsx";
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
        return () => modalDispatch({type: 'OPEN', data: document.athletes.find((athlete) => athlete.id === id)!})
    };

    const downloadDocumentOnClick = async () => {
        const path = await save(
            {
                title: 'Сохранить как',
                defaultPath: document.title,
                filters: [{name: 'Файл JSON', extensions: ['json']}]
            }
        );
        if (!path) return

        await downloadDocument(props.document.id, path)
    }

    const createOrderOnClick = async () => {
        const path = await save({title: 'Сохранить как', filters: [{name: 'Документ Word', extensions: ['docx']}]});
        if (!path) return

        await createOrder(props.document.id, path)
    }

    const createAthleteOnClick = () => {
        modalDispatch({type: 'NEW'});
    }

    const uploadAthletesOnClick = async () => {
        const path = await open({multiple: false, directory: false});
        if (!path) return

        await uploadAthletes(document.id, path)
    }

    const downloadAthletesOnClick = async () => {
        const path = await save(
            {
                title: 'Сохранить как',
                defaultPath: `${document.title} (Атлеты)`,
                filters: [{name: 'Файл JSON', extensions: ['json']}]
            }
        );
        if (!path) return

        await downloadAthletes(Array.from(selectIDs), path)
        setSelectIDs(new Set());
    }

    const removeAthletesOnClick = async () => {
        await removeAthletes(Array.from(selectIDs));
        setSelectIDs(new Set());
        setNeedUpdate(true);
    }

    const titleChange = (value: string) => {
        setDocument((document) => ({...document, title: value}));
    }

    const sportsCategoryIdChange = (id: number) => {
        setDocument((document) => ({...document, sports_category_id: id}));
    }

    return (
        <>
            <ActionBar
                document={document}
                titleChange={titleChange}
                sportsCategoryIdChange={sportsCategoryIdChange}
                downloadDocument={downloadDocumentOnClick}
                createOrder={createOrderOnClick}
                createAthlete={createAthleteOnClick}
                uploadAthletes={uploadAthletesOnClick}
                downloadAthletes={downloadAthletesOnClick}
                removeAthletes={removeAthletesOnClick}
                createOrderOnClick={createOrderOnClick}
            />
            <AthletesTable
                athletes={document.athletes}
                sports={props.sports}
                selectIDs={selectIDs}
                setSelectIDs={setSelectIDs}
                athleteModalOpen={athleteModalOpen}
            />
            {
                ['NEW', 'EDIT'].includes(modalState.mode) && <AthleteModal
                    setNeedUpdate={setNeedUpdate}
                    documentId={props.document.id}
                    sports={props.sports}
                />
            }
        </>
    );
}

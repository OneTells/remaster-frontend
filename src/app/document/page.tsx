'use client'

import {memo, use, useState} from "react";
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
import ModalContextProvider, {ModalContext} from "@/app/document/_context/modal-context.tsx";
import {useNavigationData} from "@/_hook/useNavigationData.tsx";
import {Modal} from "@/app/document/_modal/Modal/Modal.tsx";
import {useEffectIgnoreFirstRender} from "@/_hook/useEffectIgnoreFirstRender.tsx";
import {DopingAthleteType} from "@/app/doping-athletes/_types.tsx";


export const DocumentPage = memo(function DocumentPage() {
    const data = useNavigationData<{ sports: SportType[], document: DocumentType, dopingAthletes: DopingAthleteType[] }>();
    return (
        <ModalContextProvider>
            <Menu document={data.document} sports={data.sports}/>
        </ModalContextProvider>
    )
})

function Menu(props: { document: DocumentType, sports: SportType[] }) {
    const [document, setDocument] = useState<DocumentType>(props.document);
    const [selectIDs, setSelectIDs] = useState<Set<number>>(new Set());

    const [modalState, modalDispatch] = use(ModalContext)

    const update = async () => {
        const documentData = await getDocument(document.id)
        setDocument(documentData)
    }

    useEffectIgnoreFirstRender(() => {
        const timer = setTimeout(() => {
            (async () => {
                await updateDocument(document.id, document.title, document.sports_category_id!);
            })();
        }, 500);

        return () => clearTimeout(timer);
    }, [document.title, document.sports_category_id]);

    const athleteModalOpen = (id: number) => {
        return () => modalDispatch({mode: 'OPEN_MODAL', athlete: document.athletes.find((athlete) => athlete.id === id)!})
    };

    const downloadDocumentOnClick = async () => {
        const path = await save(
            {
                title: 'Сохранить как',
                defaultPath: document.title,
                filters: [{name: 'Remaster документ', extensions: ['rmd']}]
            }
        );
        if (!path) return

        await downloadDocument(props.document.id, path)
    }

    const createOrderOnClick = async () => {
        if (document.athletes.length === 0) {
            return
        }

        const options = [
            {id: 2, label: 'Первый спортивный'},
            {id: 1, label: 'КМС'},
        ];

        const path = await save({
            title: 'Сохранить как',
            defaultPath: `${document.title} (${options.find((option) => option.id === document.sports_category_id)?.label})`,
            filters: [{name: 'Документ Word', extensions: ['docx']}]
        });
        if (!path) return

        await createOrder(props.document.id, path)
    }

    const createAthleteOnClick = () => {
        modalDispatch({mode: 'CREATE_NEW_ATHLETE'});
    }

    const uploadAthletesOnClick = async () => {
        const path = await open(
            {
                title: 'Открытие файла',
                multiple: false,
                directory: false,
                filters: [{name: 'Remaster атлеты', extensions: ['rma']}]
            }
        );
        if (!path) return

        await uploadAthletes(document.id, path)
        await update();
    }

    const downloadAthletesOnClick = async () => {
        if (selectIDs.size === 0) {
            return
        }

        const path = await save(
            {
                title: 'Сохранить как',
                defaultPath: `${document.title} (Атлеты)`,
                filters: [{name: 'Remaster атлеты', extensions: ['rma']}]
            }
        );
        if (!path) return

        await downloadAthletes(Array.from(selectIDs), path)
        setSelectIDs(new Set());
    }

    const removeAthletesOnClick = async () => {
        if (selectIDs.size === 0) {
            return
        }

        await removeAthletes(Array.from(selectIDs));
        setSelectIDs(new Set());
        await update();
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
                createAthlete={createAthleteOnClick}
                uploadAthletes={uploadAthletesOnClick}
                downloadAthletes={downloadAthletesOnClick}
                removeAthletes={removeAthletesOnClick}
                createOrder={createOrderOnClick}
                createOrderDisabled={document.athletes.length === 0}
                downloadAthletesDisabled={selectIDs.size === 0}
                removeAthletesDisabled={selectIDs.size === 0}
            />
            <AthletesTable
                athletes={document.athletes}
                selectIDs={selectIDs}
                setSelectIDs={setSelectIDs}
                athleteModalOpen={athleteModalOpen}
            />
            {
                (modalState.mode !== 'CLOSE') && <Modal
                    update={update}
                    documentId={props.document.id}
                    sportCategoryId={document.sports_category_id}
                />
            }
        </>
    );
}

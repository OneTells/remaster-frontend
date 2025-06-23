'use client'

import {memo, useState} from "react";

import {useNavigation} from "@/_hook/useNavigation.tsx";
import {createDocument} from "@/app/new-document/_api.tsx";
import {AthletesTable} from "@/app/document/_components/athletes-table/AthletesTable.tsx";
import {ActionBar} from "@/app/document/_components/action-bar/ActionBar.tsx";
import {ActionBarDocumentType} from "@/app/document/_types.tsx";
import {useEffectIgnoreFirstRender} from "@/_hook/useEffectIgnoreFirstRender.tsx";


export const NewDocumentPage = memo(function NewDocumentPage() {
    return <Menu/>
})

function Menu() {
    const navigate = useNavigation();

    const [document, setDocument] = useState<ActionBarDocumentType>({
        title: '',
        sports_category_id: null
    });

    useEffectIgnoreFirstRender(() => {
        if (!document.sports_category_id)
            return

        (async () => {
            const documentId = await createDocument(document.title, document.sports_category_id!)
            await navigate(`/documents/${documentId}`, {'id': documentId});
        })()
    }, [document.title, document.sports_category_id]);

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
            />
            <AthletesTable
                selectIDs={new Set()}
                setSelectIDs={() => {
                }}
                athletes={[]}
            />
        </>
    );
}

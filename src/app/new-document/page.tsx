'use client'

import {memo, useEffect, useState} from "react";

import {ActionBar} from "@/app/new-document/_components/action-bar/ActionBar.tsx";
import {AthletesTable} from "@/app/new-document/_components/athletes-table/AthletesTable.tsx";
import {useNavigation} from "@/_hook/useNavigation.tsx";
import {createDocument} from "@/app/new-document/_api.tsx";


export const NewDocumentPage = memo(function NewDocumentPage() {
    return <Menu/>
})

function Menu() {
    const navigate = useNavigation();

    const [name, setName] = useState<string | undefined>(undefined);
    const [sportsRankId, setSportsRankId] = useState<number | null>(null);

    useEffect(() => {
        if (!name || !sportsRankId)
            return

        (async () => {
            const documentId = await createDocument(name, sportsRankId)
            await navigate(`/documents/${documentId}`, {'id': documentId});
        })()
    }, [name, sportsRankId]);

    return (
        <>
            <ActionBar
                name={name}
                setName={setName}
                sportsRankId={sportsRankId}
                setSportsRankId={setSportsRankId}
            />
            <AthletesTable/>
        </>
    );
}

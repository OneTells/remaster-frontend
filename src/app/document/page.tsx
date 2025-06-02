'use client'

import {useParams} from "react-router";
import {use, useEffect, useState} from "react";

import {getDocument} from "@/app/document/_api.tsx";
import {DocumentType} from "@/app/document/_types.tsx";
import {ActionBar} from "@/app/document/components/action-bar/ActionBar.tsx";
import {AthletesTable} from "@/app/document/components/athletes-table/AthletesTable.tsx";


export default function Page() {
    const {id} = useParams()

    const document = use(getDocument(parseInt(id!)));
    return <Menu id={parseInt(id!)} document={document}/>
}

function Menu(props: { id: number, document: DocumentType }) {
    const [name, setName] = useState<string>(props.document.title);
    const [sportsRankId, setSportsRankId] = useState<number>(props.document.sportsRankId);

    const [selectIDs, setSelectIDs] = useState<Set<number>>(new Set());
    const [needUpdate, setNeedUpdate] = useState<boolean>(false);

    useEffect(() => {
        if (!needUpdate)
            return

        (async () => {
            const document = await getDocument(props.id)
            setName(document.title)
            setSportsRankId(document.sportsRankId)

            setNeedUpdate(false);
        })()
    }, [needUpdate]);

    return (
        <>
            <ActionBar
                name={name}
                setName={setName}
                sportsRankId={sportsRankId}
                setSportsRankId={setSportsRankId}
                selectIDs={selectIDs}
                setSelectIDs={setSelectIDs}
                setNeedUpdate={setNeedUpdate}
            />
            <AthletesTable
                athletes={props.document.athletes}
                selectIDs={selectIDs}
                setSelectIDs={setSelectIDs}
            />
            <></>
        </>
    );
}

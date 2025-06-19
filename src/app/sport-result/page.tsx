'use client'

import {useState} from "react";

import {SportContainer} from "@/app/sport-result/_components/sport-container/SportContainer.tsx"
import {useNavigationData} from "@/_hook/useNavigationData.tsx";
import {SportType} from "@/app/document/_types.tsx";
import {ActionBar} from "@/app/sport-result/_components/action-bar/ActionBar.tsx";
import {DownBar} from "@/app/sport-result/_components/down-bar/DownBar.tsx";
import {getSportData} from "@/app/sport-result/_api.tsx";


export function SportResultPage() {
    const data = useNavigationData<{ sports: SportType[] }>();
    return <Menu sports={data.sports}/>;
}

function Menu({sports}: { sports: SportType[] }) {
    const [data, setData] = useState<{
        sportCategoryId: number | null,
        sportId: number | null,
        sportData: Awaited<ReturnType<typeof getSportData>> | null
    }>(
        {
            sportCategoryId: null,
            sportId: null,
            sportData: null
        }
    );

    const [isDopingCheckPassed, setIsDopingCheckPassed] = useState<boolean | null>(null);

    return (
        <>
            <ActionBar data={data} setData={setData} sports={sports} isDopingCheckPassed={isDopingCheckPassed}/>
            <SportContainer data={data} setIsDopingCheckPassed={setIsDopingCheckPassed}/>
            <DownBar isDopingCheckPassed={isDopingCheckPassed}/>
        </>
    )
}
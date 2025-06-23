'use client'

import {useState} from "react";

import {SportContainer} from "@/app/sport-result/_components/sport-container/SportContainer.tsx"
import {useNavigationData} from "@/_hook/useNavigationData.tsx";
import {ModuleType} from "@/app/document/_types.tsx";
import {ActionBar} from "@/app/sport-result/_components/action-bar/ActionBar.tsx";
import {DownBar} from "@/app/sport-result/_components/down-bar/DownBar.tsx";
import {getModuleData} from "@/app/sport-result/_api.tsx";


export function SportResultPage() {
    const data = useNavigationData<{ modules: ModuleType[] }>();
    return <Menu modules={data.modules}/>;
}

function Menu({modules}: { modules: ModuleType[] }) {
    const [data, setData] = useState<{
        sportCategoryId: number | null,
        module: ModuleType | null,
        moduleData: Awaited<ReturnType<typeof getModuleData>> | null
    }>(
        {
            sportCategoryId: null,
            module: null,
            moduleData: null
        }
    );

    const [isDopingCheckPassed, setIsDopingCheckPassed] = useState<boolean | null>(null);

    return (
        <>
            <ActionBar data={data} setData={setData} modules={modules} isDopingCheckPassed={isDopingCheckPassed}/>
            <SportContainer data={data} setIsDopingCheckPassed={setIsDopingCheckPassed}/>
            <DownBar isDopingCheckPassed={isDopingCheckPassed}/>
        </>
    )
}
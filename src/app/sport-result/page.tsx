'use client'

import {useState} from "react";

import {SportContainer} from "@/app/sport-result/_components/sport-container/SportContainer.tsx"
import {useNavigationData} from "@/_hook/useNavigationData.tsx";
import {ModuleType} from "@/app/document/_types.tsx";
import {ActionBar} from "@/app/sport-result/_components/action-bar/ActionBar.tsx";
import {DownBar} from "@/app/sport-result/_components/down-bar/DownBar.tsx";
import {checkResult, getModuleData} from "@/app/sport-result/_api.tsx";


export function SportResultPage() {
    const data = useNavigationData<{ modules: ModuleType[] }>();
    return <Menu modules={data.modules}/>;
}

function Menu({modules}: { modules: ModuleType[] }) {
    const [sportCategoryId, setSportCategoryId] = useState<number | null>(null);

    const [moduleData, setModuleData] = useState<{
        module: ModuleType | null;
        initData: Awaited<ReturnType<typeof getModuleData>> | null;
        state: any;
        isDopingCheckPassed: boolean | null
    }>({
        module: null,
        initData: null,
        state: {},
        isDopingCheckPassed: null
    });

    const selectModule = async (moduleId: number) => {
        const initData = await getModuleData(moduleId);
        setModuleData(prev => ({
            ...prev,
            module: modules.find(module => module.id === moduleId)!,
            initData: initData,
            state: {},
            isDopingCheckPassed: null
        }));
    }

    const selectSportCategoryId = async (sportCategoryId: number) => {
        if (moduleData.module !== null) {
            const initData = await getModuleData(moduleData.module.id);
            setModuleData(prev => ({...prev, initData: initData, state: {}, isDopingCheckPassed: null}));
        } else {
            setModuleData(prev => ({...prev, isDopingCheckPassed: null}));
        }

        setSportCategoryId(sportCategoryId);
    }

    const sendDataForCheck = async (data_: any | null) => {
        if (data_ === null) {
            setModuleData(prev => ({...prev, isDopingCheckPassed: null}));
            return
        }

        const isSportsCategoryGranted = await checkResult(moduleData.module!.id, data_)
        setModuleData(prev => ({...prev, isDopingCheckPassed: isSportsCategoryGranted}));
    };

    const updateState = (state: Partial<any>) => {
        setModuleData(prev => ({...prev, state: {...prev.state, ...state}}));
    }

    return (
        <>
            <ActionBar
                module={moduleData.module}
                sportCategoryId={sportCategoryId}
                selectModule={selectModule}
                selectSportCategoryId={selectSportCategoryId}
                modules={modules}
            />
            <SportContainer
                module={moduleData.module}
                sportCategoryId={sportCategoryId}
                initData={moduleData.initData}
                state={moduleData.state}
                updateState={updateState}
                sendDataForCheck={sendDataForCheck}
            />
            <DownBar isDopingCheckPassed={moduleData.isDopingCheckPassed}/>
        </>
    )
}
'use client'

import {useState} from "react";

import {SportContainer} from "@/app/sport-result/_components/sport-container/SportContainer.tsx"
import {useNavigationData} from "@/_hook/useNavigationData.tsx";
import {ModuleType} from "@/app/document/_types.tsx";
import {ActionBar} from "@/app/sport-result/_components/action-bar/ActionBar.tsx";
import {DownBar} from "@/app/sport-result/_components/down-bar/DownBar.tsx";
import {ModuleDataType, SportResultDataType} from "@/app/sport-result/_types.tsx";
import {checkResult, getModuleData} from "@/app/sport-result/_api.tsx";
import {useEffectIgnoreFirstRender} from "@/_hook/useEffectIgnoreFirstRender.tsx";


export function SportResultPage() {
    const data = useNavigationData<{ modules: ModuleType[] }>();
    return <Menu modules={data.modules}/>;
}

function Menu({modules}: { modules: ModuleType[] }) {
    const [data, setData] = useState<SportResultDataType>({
        module: null,
        sportCategoryId: null
    });

    const [moduleData, setModuleData] = useState<ModuleDataType<any>>({
        initData: null,
        state: {}
    });

    const [isDopingCheckPassed, setIsDopingCheckPassed] = useState<boolean | null>(null);

    useEffectIgnoreFirstRender(() => {
        setIsDopingCheckPassed(null);
    }, [data]);

    const loadModuleData = async (moduleId: number) => {
        const initData = await getModuleData(moduleId);
        setModuleData(prev => ({...prev, initData: initData, state: {}}));
    }

    const selectModule = async (moduleId: number) => {
        await loadModuleData(moduleId);

        setData(prev => ({...prev, module: modules.find(module => module.id === moduleId)!}));
    }

    const selectSportCategoryId = async (sportCategoryId: number) => {
        if (data.module !== null)
            await loadModuleData(data.module.id);

        setData(prev => ({...prev, sportCategoryId: sportCategoryId}));
    }

    const sendDataForCheck = async (data_: any | null) => {
        if (data_ === null) {
            setIsDopingCheckPassed(null)
            return
        }

        const isSportsCategoryGranted = await checkResult(data.module!.id, data_)
        setIsDopingCheckPassed(isSportsCategoryGranted)
    };

    const updateState = (state: Partial<any>) => {
        setModuleData(prev => ({...prev, state: {...prev.state, ...state}}));
    }

    return (
        <>
            <ActionBar data={data} selectModule={selectModule} selectSportCategoryId={selectSportCategoryId} modules={modules}/>
            <SportContainer
                data={data}
                initData={moduleData.initData}
                state={moduleData.state}
                updateState={updateState}
                sendDataForCheck={sendDataForCheck}
            />
            <DownBar isDopingCheckPassed={isDopingCheckPassed}/>
        </>
    )
}
import styles from "./ActionBar.module.css";

import {Dispatch, SetStateAction} from "react";
import {openPath} from "@tauri-apps/plugin-opener";
import {resourceDir} from "@tauri-apps/api/path";

import {ModuleType} from "@/app/document/_types.tsx";
import {Select} from "@/_ui/select/Select.tsx";
import {getModuleData} from "@/app/sport-result/_api.tsx";
import {Tooltip} from "@/_ui/tooltip/Tooltip.tsx";
import {Button} from "@/_ui/button/Button.tsx";
import {DocumentIcon} from "@/_assets/document_icon.tsx";

import {getDatabases} from "@/app/databases/_api.tsx";


type Props = {
    data: {
        sportCategoryId: number | null,
        module: ModuleType | null,
        moduleData: Awaited<ReturnType<typeof getModuleData>> | null
    };
    setData: Dispatch<SetStateAction<{
        sportCategoryId: number | null,
        module: ModuleType | null,
        moduleData: Awaited<ReturnType<typeof getModuleData>> | null
    }>>;

    isDopingCheckPassed: boolean | null

    modules: ModuleType[];
}

export const ActionBar = (props: Props) => {
    const selectModules = async (moduleId: number) => {
        const moduleData = await getModuleData(moduleId);
        props.setData(prev => ({...prev, module: props.modules.find(module => module.id === moduleId)!, moduleData: moduleData}));
    }

    const openDocument = async () => {
        if (!props.data.module) {
            return;
        }

        const slug = {
            1: 'athletics',
            2: 'programming',
            3: 'computer-sport'
        }[props.data.module.sport_id];

        const databases = await getDatabases()
        const database = databases.find((database) => database.slug === slug)

        const extension = database!.file_name!.slice(database!.file_name!.lastIndexOf('.') + 1)

        await openPath(`${await resourceDir()}/_internal/resources/${slug}.${extension}`);
    }

    return (
        <div className={styles['container']}>
            <div className={styles['field']}>
                <p className={styles['title']}>Вид спорта</p>
                <Select
                    style={{width: '280px', height: '100%'}}
                    options={props.modules.map(({title, id}) => ({id: id, label: title})).filter(module => module.id !== 1)}
                    selectedOptionId={props.data.module?.id || null}
                    setSelectedOptionId={selectModules}
                />
            </div>
            <div className={styles['field']}>
                <p className={styles['title']}>Спортивный разряд</p>
                <Select
                    options={[
                        {id: 2, label: '1 спортивный'},
                        {id: 1, label: 'КМС'},
                    ]}
                    selectedOptionId={props.data.sportCategoryId}
                    setSelectedOptionId={(id) => props.setData(prev => ({...prev, sportCategoryId: id}))}
                    style={{width: '200px', height: '100%'}}
                />
            </div>
            <div className={styles['field']}>
                <Tooltip
                    text={
                        props.data.module?.id
                            ? `Открыть документ по ${props.modules.find(module => module.id === props.data.module?.id)?.title}`
                            : 'Выберите вид спорта, чтобы открыть документ'
                    }
                    position={'bottom'}
                    align={'start'}
                    width={'100px'}
                >
                    <Button style={{height: '44px', width: '44px', padding: '10px'}} onClick={openDocument}>
                        <DocumentIcon/>
                    </Button>
                </Tooltip>
            </div>
        </div>
    )
}
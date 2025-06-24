import styles from "./ActionBar.module.css";

import {openPath} from "@tauri-apps/plugin-opener";
import {resourceDir} from "@tauri-apps/api/path";

import {ModuleType} from "@/app/document/_types.tsx";
import {Select} from "@/_ui/select/Select.tsx";
import {Tooltip} from "@/_ui/tooltip/Tooltip.tsx";
import {Button} from "@/_ui/button/Button.tsx";
import {DocumentIcon} from "@/_assets/document_icon.tsx";
import {getDatabases} from "@/app/databases/_api.tsx";


type Props = {
    module: ModuleType | null;
    sportCategoryId: number | null;

    selectModule: (moduleId: number) => Promise<void>;
    selectSportCategoryId: (sportCategoryId: number) => Promise<void>;

    modules: ModuleType[]
}

export const ActionBar = ({module, sportCategoryId, selectModule, selectSportCategoryId, modules}: Props) => {
    const openDocument = async () => {
        if (!module) {
            return;
        }

        const slug = {
            1: 'athletics',
            2: 'programming',
            3: 'computer-sport'
        }[module.sport_id];

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
                    options={modules.map(({title, id}) => ({id: id, label: title}))}
                    selectedOptionId={module?.id || null}
                    setSelectedOptionId={selectModule}
                    searchable={true}
                />
            </div>
            <div className={styles['field']}>
                <p className={styles['title']}>Спортивный разряд</p>
                <Select
                    options={[
                        {id: 2, label: '1 спортивный'},
                        {id: 1, label: 'КМС'},
                    ]}
                    selectedOptionId={sportCategoryId}
                    setSelectedOptionId={selectSportCategoryId}
                    style={{width: '200px', height: '100%'}}
                />
            </div>
            <div className={styles['field']}>
                <Tooltip
                    text={
                        module?.id
                            ? `Открыть документ по ${modules.find(module => module.id === module?.id)?.title}`
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
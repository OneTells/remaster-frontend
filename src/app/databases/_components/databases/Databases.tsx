'use client';

import styles from "./Databases.module.css";

import {DialogFilter, open, save} from '@tauri-apps/plugin-dialog';
import {useState} from "react";

import {Panel} from "@/app/databases/_components/panel/Panel";
import {DatabasesType} from "@/app/databases/_types.tsx";
import {downloadDatabase, getDatabases, uploadDatabase} from "@/app/databases/_api.tsx";


export function Databases(props: { data: DatabasesType[] }) {
    const [data, setData] = useState<DatabasesType[]>(props.data);

    const update = async () => {
        const databases_data = await getDatabases()
        setData(databases_data)
    }

    const dataById = data.reduce<Record<string, DatabasesType>>((acc, item) => {
        acc[item.slug] = item;
        return acc;
    }, {});

    const download = (slug: string, fileName: string | null, filters: DialogFilter[]) => {
        return (
            async () => {
                if (fileName === null)
                    return

                const path = await save(
                    {
                        title: 'Сохранить как',
                        defaultPath: fileName,
                        filters: filters
                    }
                );

                if (!path) {
                    return;
                }

                await downloadDatabase(slug, path)
            }
        )

    };

    const upload = (slug: string, filters: DialogFilter[]) => {
        return (
            async () => {
                const path = await open(
                    {
                        title: 'Открытие файла',
                        multiple: false,
                        directory: false,
                        filters: filters
                    }
                );

                if (!path) {
                    return;
                }

                await uploadDatabase(slug, path);
                await update()
            }
        )

    };

    return (
        <div className={styles.container}>
            <Panel
                date={dataById['orders'].date}
                title={dataById['orders'].title}
                upload={upload('orders', [{name: 'Документ Word', extensions: ['docx']}])}
                download={download('orders', dataById['orders'].file_name, [{name: 'Документ Word', extensions: ['docx']}])}
            />
            <Panel
                date={dataById['doping-athletes'].date}
                title={dataById['doping-athletes'].title}
                upload={upload('doping-athletes', [{name: 'Документ Excel', extensions: ['xlsx']}])}
                download={
                    download(
                        'doping-athletes', dataById['doping-athletes'].file_name,
                        [{name: 'Документ Excel', extensions: ['xlsx']}]
                    )
                }
            />
            <Panel
                date={dataById['athletics'].date}
                title={dataById['athletics'].title}
                upload={upload('athletics', [{name: 'Документ Excel', extensions: ['xlsx', 'xls']}])}
                download={download(
                    'athletics', dataById['athletics'].file_name,
                    [{name: 'Документ Excel', extensions: ['xlsx', 'xls']}]
                )}
            />
            <Panel
                date={dataById['programming'].date}
                title={dataById['programming'].title}
                upload={upload('programming', [{name: 'Документ Excel', extensions: ['xls', 'xlsx']}])}
                download={download(
                    'programming', dataById['programming'].file_name,
                    [{name: 'Документ Excel', extensions: ['xlsx', 'xls']}]
                )}
            />
            <Panel
                date={dataById['computer-sport'].date}
                title={dataById['computer-sport'].title}
                upload={upload('computer-sport', [{name: 'Документ Excel', extensions: ['xls', 'xlsx']}])}
                download={download(
                    'computer-sport', dataById['computer-sport'].file_name,
                    [{name: 'Документ Excel', extensions: ['xlsx', 'xls']}]
                )}
            />
        </div>
    );
}

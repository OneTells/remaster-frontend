'use client';

import styles from "./Databases.module.css";

import {open, save} from '@tauri-apps/plugin-dialog';

import {Panel} from "@/app/databases/_components/panel/Panel";
import {DatabasesType} from "@/app/databases/_types.tsx";
import {downloadDatabase, uploadDatabase} from "@/app/databases/_api.tsx";


export function Databases(props: { data: DatabasesType[] }) {
    const dataById = props.data.reduce<Record<string, DatabasesType>>((acc, item) => {
        acc[item.slug] = item;
        return acc;
    }, {});

    const download = (slug: string, name: string, extensions: string[]) => {
        return (
            async () => {
                const path = await save({filters: [{name: name, extensions: extensions}]});

                if (!path) {
                    return;
                }

                await downloadDatabase(slug, path)
            }
        )

    };

    const upload = (slug: string) => {
        return (
            async () => {
                const path = await open({ multiple: false, directory: false});

                if (!path) {
                    return;
                }

                await uploadDatabase(slug, path)
            }
        )

    };

    return (
        <div className={styles.container}>
            <Panel
                date={dataById['order'].date}
                title="Шаблон приказа"
                upload={upload('order')}
                download={download('order', dataById['order'].title, ['doc', 'docx'])}
            />
            <Panel
                date={dataById['doping-athletes'].date}
                title="(База) Русадо"
                upload={upload('doping-athletes')}
                download={download('doping-athletes', dataById['doping-athletes'].title, ['xlsx'])}
            />
            <Panel
                date={dataById['athletics'].date}
                title="(База) Легкая атлетика"
                upload={() => {
                }}
                download={() => {
                }}
            />
            <Panel
                date={dataById['programming'].date}
                title="(База) Спортивное программирование"
                upload={() => {
                }}
                download={() => {
                }}
            />
            <Panel
                date={dataById['computer-sport'].date}
                title="(База) Компьютерный спорт"
                upload={() => {
                }}
                download={() => {
                }}
            />
        </div>
    );
}

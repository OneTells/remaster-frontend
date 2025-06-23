'use client';

import React, {use, useState} from 'react';
import styles from './ResultAthletesModal.module.css';
import {Button} from "@/_ui/button/Button.tsx";
import {DownBar} from "@/app/sport-result/_components/down-bar/DownBar.tsx";
import {AthleteType} from "@/app/document/_types.tsx";
import {DefaultAthleteType, ModalContext} from "@/app/document/_context/modal-context.tsx";
import {SportContainer} from "@/app/sport-result/_components/sport-container/SportContainer.tsx";

type Props = {
    athlete: DefaultAthleteType | AthleteType;
    setAthlete: React.Dispatch<React.SetStateAction<DefaultAthleteType | AthleteType>>;
}

export const ResultAthletesModal = (props: Props) => {
    const [tabs, setTabs] = useState<Array<{
        id: number;
        title: string;
        data: any;
    }>>([
        {
            id: 1,
            title: '1',
            data: {
                sportCategoryId: 1,
                module: {
                    id: 3,
                    title: 'Спортивное программирование',
                    sport_id: 1
                },
                moduleData: {
                    competition_statuses: [],
                    disciplines: [],
                }
            }
        }
    ]);
    const [activeTab, setActiveTab] = useState<number>(1);
    const [isDopingCheckPassed, setIsDopingCheckPassed] = useState<boolean | null>(null);

    const [state, modalDispatch] = use(ModalContext);

    if (state.mode !== 'CHECK_RESULT_MENU')
        throw new Error('Unexpected mode: ' + state.mode);

    const cancelOnClick = () => {
        modalDispatch({mode: 'OPEN_EDIT_MENU'});
    }

    const saveOnClick = async () => {
        props.setAthlete(value => ({...value, is_sports_category_granted: null}));
        modalDispatch({mode: 'OPEN_EDIT_MENU'});
    };

    const addElement = () => {
        const newId = tabs.length > 0 ? Math.max(...tabs.map(tab => tab.id)) + 1 : 1;
        setTabs([...tabs, {
            id: newId,
            title: newId.toString(),
            data: {
                sportCategoryId: 1,
                module: {
                    id: 3,
                    title: 'Спортивное программирование',
                    sport_id: 1
                },
                moduleData: {
                    competition_statuses: [],
                    disciplines: [],
                }
            }
        }]);
        setActiveTab(newId);
    };

    return (
        <div className={styles.container}>
            <div className={styles.content}>
                <div className={styles.navSidebar}>
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            className={`${styles.navItem} ${activeTab === tab.id ? styles.active : ''}`}
                            onClick={() => setActiveTab(tab.id)}
                        >
                            {tab.title}
                        </button>
                    ))}
                    <button
                        className={`${styles.navItem} ${styles.addButton}`}
                        onClick={addElement}
                    >
                        <span>+</span>
                    </button>
                </div>
                <div>
                    {tabs.filter(tab => tab.id === activeTab).map(tab => (
                        <div key={tab.id}>
                            <SportContainer
                                data={tab.data}
                                setIsDopingCheckPassed={setIsDopingCheckPassed}
                            />
                        </div>
                    ))}
                </div>
            </div>
            <div className={styles.footer}>
                <div className={styles.footerLeft}>
                    <DownBar isDopingCheckPassed={isDopingCheckPassed}/>
                </div>
                <Button className={styles.button} onClick={cancelOnClick}>
                    Назад
                </Button>
                <Button className={styles.button} onClick={saveOnClick}>
                    Сохранить
                </Button>
            </div>
        </div>
    );
};
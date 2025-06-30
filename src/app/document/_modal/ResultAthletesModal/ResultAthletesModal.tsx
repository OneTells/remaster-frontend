import styles from './ResultAthletesModal.module.css';

import {use, useEffect} from 'react';

import {Button} from "@/_ui/button/Button.tsx";
import {DownBar} from "@/app/sport-result/_components/down-bar/DownBar.tsx";
import {ModuleTabType, ModuleType} from "@/app/document/_types.tsx";
import {ModalContext} from "@/app/document/_context/modal-context.tsx";
import {SportContainer} from "@/app/sport-result/_components/sport-container/SportContainer.tsx";
import {checkResult, getModuleData} from "@/app/sport-result/_api.tsx";
import {useNavigationData} from "@/_hook/useNavigationData.tsx";
import {ActionBar} from "@/app/document/_modal/ResultAthletesModal/_components/action-bar/ActionBar.tsx";


type Props = {
    sportCategoryId: number
}

export const ResultAthletesModal = ({sportCategoryId}: Props) => {
    const [state, modalDispatch] = use(ModalContext);

    if (state.mode !== 'CHECK_RESULT_MENU')
        throw new Error('Unexpected mode: ' + state.mode);

    const data = useNavigationData<{ modules: ModuleType[] }>();
    const modules = data.modules.filter(module => module.sport_id === state.athlete.sport_id);

    useEffect(() => {
        if (
            modules.length > 1
            || state.athlete.result_data.moduleTabs.length > 1
            || state.athlete.result_data.moduleTabs[0].module !== null
        )
            return;

        (async () => {
            const moduleId = modules[0].id;

            const initData = await getModuleData(moduleId);
            modalDispatch({
                mode: 'UPDATE_DATA_IN_RESULT_MENU',
                resultCheckerData: {
                    moduleTabs: [
                        {
                            ...state.athlete.result_data.moduleTabs[state.athlete.result_data.activeTab],
                            module: modules.find(module => module.id === moduleId)!,
                            initData: initData,
                        },
                    ]
                }
            })
        })()
    }, []);

    const selectModule = async (moduleId: number) => {
        const initData = await getModuleData(moduleId);
        modalDispatch({
            mode: 'UPDATE_DATA_IN_RESULT_MENU',
            resultCheckerData: {
                moduleTabs: [
                    ...state.athlete.result_data.moduleTabs.slice(0, state.athlete.result_data.activeTab),
                    {
                        ...state.athlete.result_data.moduleTabs[state.athlete.result_data.activeTab],
                        module: modules.find(module => module.id === moduleId)!,
                        initData: initData,
                        state: {},
                        isDopingCheckPassed: null
                    },
                    ...state.athlete.result_data.moduleTabs.slice(state.athlete.result_data.activeTab + 1)
                ]
            }
        })
    }

    const removeTab = async () => {
        const currentTabs = [...state.athlete.result_data.moduleTabs];
        const activeTabIndex = state.athlete.result_data.activeTab;

        if (currentTabs.length <= 1) {
            let moduleTabs: ModuleTabType = {
                module: null,
                initData: null,
                state: {},
                isDopingCheckPassed: null
            }

            if (modules.length === 1) {
                const moduleId = modules[0].id;
                const initData = await getModuleData(moduleId);

                moduleTabs = {
                    ...moduleTabs,
                    module: modules.find(module => module.id === moduleId)!,
                    initData: initData,
                }
            }

            modalDispatch({
                mode: 'UPDATE_DATA_IN_RESULT_MENU',
                resultCheckerData: {
                    moduleTabs: [moduleTabs]
                }
            });
            return;
        }

        currentTabs.splice(activeTabIndex, 1);

        let newActiveTab = activeTabIndex;
        if (newActiveTab >= currentTabs.length) {
            newActiveTab = currentTabs.length - 1;
        }

        modalDispatch({
            mode: 'UPDATE_DATA_IN_RESULT_MENU',
            resultCheckerData: {
                moduleTabs: currentTabs,
                activeTab: newActiveTab
            }
        });
    };

    const sendDataForCheck = async (data_: any | null) => {
        if (data_ === null) {
            modalDispatch({
                mode: 'UPDATE_DATA_IN_RESULT_MENU',
                resultCheckerData: {
                    moduleTabs: [
                        ...state.athlete.result_data.moduleTabs.slice(0, state.athlete.result_data.activeTab),
                        {...state.athlete.result_data.moduleTabs[state.athlete.result_data.activeTab], isDopingCheckPassed: null},
                        ...state.athlete.result_data.moduleTabs.slice(state.athlete.result_data.activeTab + 1)
                    ]
                }
            })
            return
        }

        const isSportsCategoryGranted = await checkResult(
            state.athlete.result_data.moduleTabs[state.athlete.result_data.activeTab].module!.id,
            data_
        )
        modalDispatch({
            mode: 'UPDATE_DATA_IN_RESULT_MENU',
            resultCheckerData: {
                moduleTabs: [
                    ...state.athlete.result_data.moduleTabs.slice(0, state.athlete.result_data.activeTab),
                    {
                        ...state.athlete.result_data.moduleTabs[state.athlete.result_data.activeTab],
                        isDopingCheckPassed: isSportsCategoryGranted
                    },
                    ...state.athlete.result_data.moduleTabs.slice(state.athlete.result_data.activeTab + 1)
                ]
            }
        })
    };

    const updateState = (state_: Partial<any>) => {
        modalDispatch({
            mode: 'UPDATE_DATA_IN_RESULT_MENU',
            resultCheckerData: {
                moduleTabs: [
                    ...state.athlete.result_data.moduleTabs.slice(0, state.athlete.result_data.activeTab),
                    {
                        ...state.athlete.result_data.moduleTabs[state.athlete.result_data.activeTab],
                        state: {...state.athlete.result_data.moduleTabs[state.athlete.result_data.activeTab].state, ...state_}
                    },
                    ...state.athlete.result_data.moduleTabs.slice(state.athlete.result_data.activeTab + 1)
                ]
            }
        });
    }

    const cancelOnClick = () => {
        modalDispatch({mode: 'OPEN_EDIT_MENU'});
    }

    const saveOnClick = async () => {
        if (state.athlete.result_data.moduleTabs.some(tab => tab.isDopingCheckPassed !== null))
            modalDispatch({
                mode: 'UPDATE_ATHLETE_DATA',
                athlete: {
                    'is_sports_category_granted': (
                        state.athlete.result_data.moduleTabs.some(tab => [true].includes(tab.isDopingCheckPassed === true))
                    )
                }
            });

        modalDispatch({mode: 'OPEN_EDIT_MENU'});
    };

    const addTab = async () => {
        let moduleTabs: ModuleTabType = {
            module: null,
            initData: null,
            state: {},
            isDopingCheckPassed: null
        }

        if (modules.length === 1) {
            const moduleId = modules[0].id;
            const initData = await getModuleData(moduleId);

            moduleTabs = {
                ...moduleTabs,
                module: modules.find(module => module.id === moduleId)!,
                initData: initData,
            }
        }

        modalDispatch({
            mode: 'UPDATE_DATA_IN_RESULT_MENU',
            resultCheckerData: {
                moduleTabs: [...state.athlete.result_data.moduleTabs, moduleTabs],
                activeTab: state.athlete.result_data.moduleTabs.length
            }
        });
    };

    return (
        <div className={styles.container}>
            <div className={styles.content}>
                <div className={styles.navSidebar}>
                    {state.athlete.result_data.moduleTabs.map((_, index) => (
                        <button
                            key={index}
                            className={`${styles.navItem} ${
                                state.athlete.result_data.activeTab === index ? styles.active : ''
                            }`}
                            onClick={() => modalDispatch({
                                mode: 'UPDATE_DATA_IN_RESULT_MENU',
                                resultCheckerData: {activeTab: index}
                            })}
                        >
                            {index + 1}
                        </button>
                    ))}
                    <button
                        className={`${styles.navItem} ${styles.addButton}`}
                        onClick={addTab}
                    >
                        +
                    </button>
                </div>

                <div className={styles.contentWrapper}>
                    <div>
                        <ActionBar
                            module={state.athlete.result_data.moduleTabs[state.athlete.result_data.activeTab].module}
                            selectModule={selectModule}
                            modules={modules}
                            removeTab={removeTab}
                        />
                    </div>
                    <div className={styles.sportContainer}>
                        <SportContainer
                            module={state.athlete.result_data.moduleTabs[state.athlete.result_data.activeTab].module}
                            sportCategoryId={sportCategoryId}
                            initData={state.athlete.result_data.moduleTabs[state.athlete.result_data.activeTab].initData}
                            state={state.athlete.result_data.moduleTabs[state.athlete.result_data.activeTab].state}
                            updateState={updateState}
                            sendDataForCheck={sendDataForCheck}
                        />
                    </div>
                </div>
            </div>

            <div className={styles.footer}>
                <div style={{marginRight: 'auto'}}>
                    <DownBar
                        isDopingCheckPassed={
                            state.athlete.result_data.moduleTabs.some(tab => tab.isDopingCheckPassed !== null)
                                ? state.athlete.result_data.moduleTabs.some(tab => tab.isDopingCheckPassed === true)
                                : null
                        }
                    />
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
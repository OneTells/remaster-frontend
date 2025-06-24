import styles from "./Modal.module.css";

import {use, useEffect, useRef} from "react";

import {ModalContext} from "@/app/document/_context/modal-context.tsx";
import {AthleteType} from "@/app/document/_types.tsx";
import {WindowCloseIcon} from "@/_assets/window_close_icon.tsx";
import {AthleteModal} from "@/app/document/_modal/AthleteModal/AthleteModal.tsx";
import {DopingAthletesModal} from "@/app/document/_modal/DopingAthletesModal/DopingAthletesModal.tsx";
import {updateAthletes, updateCheckerData} from "@/app/document/_api.tsx";
import {useEffectIgnoreFirstRender} from "@/_hook/useEffectIgnoreFirstRender.tsx";
import {ResultAthletesModal} from "@/app/document/_modal/ResultAthletesModal/ResultAthletesModal.tsx";


type Props = {
    documentId: number;
    update: () => Promise<void>;
    sportCategoryId: number
}

export function Modal({documentId, update, sportCategoryId}: Props) {
    const [state, modalDispatch] = use(ModalContext);

    if (state.mode === 'CLOSE')
        throw new Error('Unexpected mode: ' + state.mode);

    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if ((event.target as Node) === ref.current)
                modalDispatch({mode: 'CLOSE'})
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, []);

    useEffectIgnoreFirstRender(() => {
        if (!('id' in state.athlete)) return;

        const timer = setTimeout(() => {
            (async () => {
                if (!Object.values(state.athlete).every(val => val !== null && val !== ''))
                    return;

                await updateAthletes((state.athlete as AthleteType).id, state.athlete as AthleteType);
                await update();
            })();
        }, 300);

        return () => clearTimeout(timer);
    }, [state.athlete]);

    useEffectIgnoreFirstRender(() => {
        const timer = setTimeout(() => {
            (async () => {
                modalDispatch({
                    mode: 'UPDATE_ATHLETE_DATA',
                    athlete: {
                        doping_data: {full_name: '', selectId: null}
                    }
                })
            })();
        }, 300);

        return () => clearTimeout(timer);
    }, [state.athlete.birth_date]);

    useEffectIgnoreFirstRender(() => {
        const timer = setTimeout(() => {
            (async () => {
                modalDispatch({
                    mode: 'UPDATE_ATHLETE_DATA',
                    athlete: {
                        result_data: {
                            moduleTabs: [{
                                module: null,
                                initData: null,
                                state: {},
                                isDopingCheckPassed: null
                            }],
                            activeTab: 0
                        }
                    }
                })
            })();
        }, 300);

        return () => clearTimeout(timer);
    }, [state.athlete.sport_id]);

    useEffectIgnoreFirstRender(() => {
        if (!('id' in state.athlete)) return;

        const timer = setTimeout(() => {
            (async () => {
                await updateCheckerData('doping', (state.athlete as AthleteType).id, state.athlete.doping_data);
                await update();
            })();
        }, 300);

        return () => clearTimeout(timer);
    }, [state.athlete.doping_data]);

    useEffectIgnoreFirstRender(() => {
        if (!('id' in state.athlete)) return;

        const timer = setTimeout(() => {
            (async () => {
                await updateCheckerData('result', (state.athlete as AthleteType).id, state.athlete.result_data);
                await update();
            })();
        }, 300);

        return () => clearTimeout(timer);
    }, [state.athlete.result_data]);

    return (
        <div className={styles["modal"]} ref={ref}>
            <div className={styles["athlete-profile-card"]}>
                <div style={{display: 'flex', justifyContent: 'flex-end'}}>
                    <button className={styles["close-button"]} onClick={() => modalDispatch({mode: 'CLOSE'})}>
                        <WindowCloseIcon/>
                    </button>
                </div>
                {(state.mode === 'EDIT_MENU') && <AthleteModal update={update} documentId={documentId}/>}
                {(state.mode === 'CHECK_DOPING_MENU') && <DopingAthletesModal/>}
                {(state.mode === 'CHECK_RESULT_MENU') && <ResultAthletesModal sportCategoryId={sportCategoryId}/>}
            </div>
        </div>
    )
}

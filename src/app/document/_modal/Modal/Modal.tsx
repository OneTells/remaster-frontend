import styles from "./Modal.module.css";

import {Dispatch, SetStateAction, use, useEffect, useRef, useState} from "react";

import {DefaultAthleteType, ModalContext} from "@/app/document/_context/modal-context.tsx";
import {AthleteType, SportType} from "@/app/document/_types.tsx";
import {WindowCloseIcon} from "@/_assets/window_close_icon.tsx";
import {AthleteModal} from "@/app/document/_modal/AthleteModal/AthleteModal.tsx";
import {DopingAthletesModal} from "@/app/document/_modal/DopingAthletesModal/DopingAthletesModal.tsx";
import {DopingAthleteType} from "@/app/doping-athletes/_types.tsx";
import {updateAthletes} from "@/app/document/_api.tsx";


type Props = {
    documentId: number;
    setNeedUpdate: Dispatch<SetStateAction<boolean>>;

    sports: SportType[]
    dopingAthletes: DopingAthleteType[]
}

export function Modal({documentId, setNeedUpdate, sports, dopingAthletes}: Props) {
    const [state, modalDispatch] = use(ModalContext);

    if (state.mode === 'CLOSE')
        throw new Error('Unexpected mode: ' + state.mode);

    const ref = useRef<HTMLDivElement>(null);

    const [athleteData, setAthleteData] = useState<DefaultAthleteType | AthleteType>(state.athlete);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if ((event.target as Node) === ref.current)
                modalDispatch({mode: 'CLOSE'})
        };

        document.addEventListener('click', handleClickOutside);
        return () => document.removeEventListener('click', handleClickOutside)
    }, []);

    useEffect(() => {
        if (!('id' in state.athlete)) {
            return;
        }

        (async () => {
            await updateAthletes((state.athlete as AthleteType).id, athleteData as AthleteType);
            setNeedUpdate(true);
        })();
    }, [athleteData]);

    return (
        <div className={styles["modal"]} ref={ref}>
            <div className={styles["athlete-profile-card"]}>
                <div style={{display: 'flex', justifyContent: 'flex-end'}}>
                    <button className={styles["close-button"]} onClick={() => modalDispatch({mode: 'CLOSE'})}>
                        <WindowCloseIcon/>
                    </button>
                </div>
                {
                    (state.mode === 'EDIT_MENU') && <AthleteModal
                        setNeedUpdate={setNeedUpdate}
                        documentId={documentId}
                        sports={sports}
                        athlete={athleteData}
                        setAthlete={setAthleteData}
                    />
                }
                {
                    (state.mode === 'CHECK_DOPING_MENU') && <DopingAthletesModal
                        athlete={athleteData}
                        setAthlete={setAthleteData}
                        dopingAthletes={dopingAthletes}
                    />
                }
            </div>
        </div>
    )
}

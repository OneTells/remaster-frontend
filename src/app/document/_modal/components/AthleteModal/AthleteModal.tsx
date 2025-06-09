import "./AthleteModal.module.css";

import {Dispatch, SetStateAction, use, useEffect, useRef, useState} from "react";

import AthleteFormView from "@/app/document/_modal/components/AthleteFormView";
import {DefaultAthleteType, ModalContext} from "@/app/document/_context/modal-context.tsx";
import {AthleteType, SportType} from "@/app/document/_types.tsx";
import {createAthlete, updateAthletes} from "@/app/document/_api.tsx";
import {WindowCloseIcon} from "@/_assets/window_close_icon.tsx";


type Props = {
    documentId: number;
    setNeedUpdate: Dispatch<SetStateAction<boolean>>;

    sports: SportType[]
}

export function AthleteModal({documentId, setNeedUpdate, sports}: Props) {
    const [state, modalDispatch] = use(ModalContext);

    const ref = useRef<HTMLDivElement>(null);

    const [athleteData, setAthleteData] = useState<DefaultAthleteType | AthleteType>(
        state.data as (DefaultAthleteType | AthleteType)
    );

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if ((event.target as Node) === ref.current)
                modalDispatch({type: 'CLOSE'})
        };

        document.addEventListener('click', handleClickOutside);
        return () => document.removeEventListener('click', handleClickOutside)
    }, []);

    const saveOnClick = async () => {
        if (state.mode === 'EDIT') {
            await updateAthletes(state.data.id, athleteData as AthleteType);
        } else if (state.mode === 'NEW') {
            if (!Object.values(athleteData).every(val => val !== null))
                return;

            await createAthlete(documentId, athleteData as AthleteType);
        }

        modalDispatch({type: 'CLOSE'});
        setNeedUpdate(true);
    };

    return (
        <div className="modal" ref={ref}>
            <div className="athlete-profile-card">
                <div className="svg-container" onClick={() => modalDispatch({type: 'CLOSE'})}>
                    <WindowCloseIcon/>
                </div>
                <AthleteFormView
                    athlete={athleteData}
                    setAthleteData={setAthleteData}
                    mode={state.mode as 'EDIT' | 'NEW'}
                    saveOnClick={saveOnClick}
                    sports={sports}
                />
            </div>
        </div>
    );
}

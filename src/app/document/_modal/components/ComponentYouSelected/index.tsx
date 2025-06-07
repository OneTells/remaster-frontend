import {Dispatch, SetStateAction, use, useEffect, useRef, useState} from "react";
import "./style.css";
import AthleteFormView from "@/app/document/_modal/components/AthleteFormView";
import {ModalContext} from "@/app/document/_context/modal-context.tsx";
import SvgIcon1 from "@/app/document/_modal/components/ComponentYouSelected/icons/SvgIcon1.tsx";
import {AthleteType} from "@/app/document/_types.tsx";
import {createAthlete, updateAthletes} from "@/app/document/_api.tsx";

function ComponentYouSelected({setNeedUpdate, documentId}: { setNeedUpdate: Dispatch<SetStateAction<boolean>>, documentId: number }) {
    const [state, modalDispatch] = use(ModalContext);
    const modalRef = useRef<HTMLDivElement>(null);

    // Check if we're in edit mode (has athlete data) or create mode (no athlete data)
    const isEditMode = !!state.data;
    
    // Initialize form with athlete data or empty values
    const [athleteData, setAthleteData] = useState<AthleteType | null>(
        isEditMode ? state.data : null
    );

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
                modalDispatch({type: 'CLOSE'});
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [modalDispatch]);

    const saveOnClick = async () => {
        if (!athleteData) return;
        
        try {
            if (isEditMode) {
                await updateAthletes(athleteData.id, athleteData);
            } else {
                await createAthlete(documentId, athleteData);
            }

            modalDispatch({type: 'CLOSE'});
            setNeedUpdate(true);
        } catch (error) {
            console.error('Error saving athlete:', error);
            // Handle error (show toast, etc.)
        }
    };

    return (
        <div className="athlete-registration-form modal">
            <div className="athlete-profile-card1 modal-content">
                <div className="athlete-profile-card" ref={modalRef}>
                    <div className="svg-container" onClick={() => modalDispatch({type: 'CLOSE'})}>
                        <SvgIcon1 className="svg-container"/>
                    </div>
                    <div className="athlete-info-card1">
                        <AthleteFormView 
                            athlete={athleteData} 
                            setAthleteData={setAthleteData}
                            isEditMode={isEditMode}
                        />
                        <div className="doping-check-controls">
                            {/*<button className="doping-check-button1">Проверка на доппинг</button>*/}
                            {/*        <button className="doping-check-button">Проверка результата</button>*/}
                            <button 
                                className="save-button-style" 
                                onClick={saveOnClick}
                                disabled={!athleteData?.full_name}
                            >
                                {isEditMode ? 'Сохранить' : 'Создать'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ComponentYouSelected;
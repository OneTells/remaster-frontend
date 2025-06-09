import "./style.css";

import React from "react";

import {AthleteType, SportType} from "@/app/document/_types.tsx";
import {Select} from "@/_ui/select/Select.tsx";
import {DefaultAthleteType} from "@/app/document/_context/modal-context.tsx";


type Props = {
    athlete: DefaultAthleteType | AthleteType;
    setAthleteData: React.Dispatch<React.SetStateAction<DefaultAthleteType | AthleteType>>;

    mode: 'EDIT' | 'NEW';
    saveOnClick: () => void;

    sports: SportType[];
};

export default function AthleteFormView({athlete, setAthleteData, mode, saveOnClick, sports}: Props) {
    return (
        <div className="athlete-info-card1">
            <div className="center-column-with-gaps">
                <div className="info-block">
                    <p className="header-text-container">ФИО</p>
                    <div className="hierarchical-text-container">
                        <input
                            value={athlete.full_name}
                            onChange={(e) => setAthleteData(prev => ({...prev, 'full_name': e.target.value}))}
                            type="text"
                            className="input-field-with-border-radius input-style-f62::placeholder"
                        />
                    </div>
                </div>
                <div className="personal-info-container">
                    <p className="profile-info-heading">Дата рождения</p>
                    <div className="hierarchical-text-container">
                        <input
                            type="date"
                            className="input-field-with-border-radius input-style-f62::placeholder"
                            style={{height: "44px", paddingRight: "10px", colorScheme: 'dark'}}
                            value={athlete.birth_date}
                            onChange={(e) => setAthleteData(prev => ({...prev, 'birth_date': e.target.value}))}
                        />
                    </div>
                </div>
                <div className="sport-info-container">
                    <p className="profile-info-heading">Вид спорта</p>
                    <div className="hierarchical-text-container">
                        <div>
                            <Select
                                options={sports.map(({name, ...rest}) => ({...rest, label: name}))}
                                selectedOptionId={athlete.sport_id}
                                setSelectedOptionId={(id) => setAthleteData(prev => ({...prev, 'sport_id': id}))}
                                style={{width: '100%'}}
                            />
                        </div>
                    </div>
                </div>
                <div className="municipality-education-section">
                    <p className="municipal-education-heading">
                        Муницип.
                        <br/>
                        образование
                    </p>
                    <div className="hierarchical-text-container">
                        <input
                            value={athlete.municipality}
                            type="text"
                            className="input-field-with-border-radius input-style-f62::placeholder"
                            onChange={(e) => setAthleteData(prev => ({...prev, 'municipality': e.target.value}))}
                        />
                    </div>
                </div>
                <div className="organization-info-container">
                    <p className="header-text-container">Организация</p>
                    <div className="hierarchical-text-container">
                        <input
                            value={athlete.organization}
                            type="text"
                            className="input-field-with-border-radius input-style-f62::placeholder"
                            onChange={(e) => setAthleteData(prev => ({...prev, 'organization': e.target.value}))}
                        />
                    </div>
                </div>
                <div className="info-block">
                    <p className="header-text-container">Присвоить разряд</p>
                    <div className="hierarchical-text-container">
                        <Select
                            options={[
                                {id: 1, label: 'Да'},
                                {id: 2, label: 'Нет'},
                            ]}
                            selectedOptionId={
                                athlete.is_sports_category_granted !== null ? (athlete.is_sports_category_granted ? 1 : 2) : null
                            }
                            setSelectedOptionId={(id) => setAthleteData(prev => ({
                                ...prev,
                                'is_sports_category_granted': id === 1
                            }))}
                            style={{width: '100%'}}
                        />
                    </div>
                </div>
                <div className="flex-row-with-spacing">
                    <p className="header-text-container">Тест на допинг</p>
                    <div className="hierarchical-text-container">
                        <Select
                            options={[
                                {id: 1, label: 'Отрицательно'},
                                {id: 2, label: 'Положительно'},
                            ]}
                            selectedOptionId={
                                athlete.is_doping_check_passed !== null ? (athlete.is_doping_check_passed ? 1 : 2) : null
                            }
                            setSelectedOptionId={(id) => setAthleteData(prev => ({
                                ...prev,
                                'is_doping_check_passed': id === 1
                            }))}
                            style={{width: '100%'}}
                        />
                    </div>
                </div>
            </div>
            <div className="doping-check-controls">
                <button className="save-button-style" onClick={saveOnClick}>
                    {mode === 'EDIT' ? 'Сохранить' : 'Создать'}
                </button>
            </div>
        </div>
    );
}


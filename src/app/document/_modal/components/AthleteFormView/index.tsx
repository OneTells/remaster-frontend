import "./style.css";
import {AthleteType} from "@/app/document/_types.tsx";
import React from "react";
import {Select} from "@/_ui/select/Select.tsx";

type AthleteFormViewProps = {
    athlete: AthleteType | null;
    setAthleteData: React.Dispatch<React.SetStateAction<AthleteType | null>>;
    isEditMode?: boolean;
};

const defaultAthlete: Omit<AthleteType, 'id'> = {
    full_name: '',
    birth_date: new Date().toISOString().split('T')[0],
    sport_name: '',
    municipality: '',
    organization: '',
    is_sports_category_granted: false,
    is_doping_check_passed: false,
};

function AthleteFormView({ athlete, setAthleteData }: AthleteFormViewProps) {
    const currentAthlete = athlete || { ...defaultAthlete, id: 0 };

    const handleChange = (field: keyof AthleteType, value: any) => {
        setAthleteData(prev => ({
            ...(prev || { ...defaultAthlete, id: 0 }),
            [field]: value
        }));
    };

    return (
        <div className="center-column-with-gaps">
            <div className="info-block">
                <p className="header-text-container">ФИО</p>
                <div className="hierarchical-text-container">
                    <input
                        value={currentAthlete.full_name}
                        onChange={(e) => handleChange('full_name', e.target.value)}
                        type="text"
                        className="input-field-with-border-radius input-style-f62::placeholder"
                        // disabled={!isEditMode}
                    />
                </div>
            </div>
            <div className="personal-info-container">
                <p className="profile-info-heading">Дата рождения</p>
                <div className="hierarchical-text-container">
                    <input
                        type="date"
                        className="input-field-with-border-radius input-style-f62::placeholder"
                        style={{height: "44px", paddingRight: "10px"}}
                        value={currentAthlete.birth_date}
                        onChange={(e) => handleChange('birth_date', e.target.value)}
                        // disabled={!isEditMode}
                    />
                </div>
            </div>
            <div className="sport-info-container">
                <p className="profile-info-heading">Вид спорта</p>
                <div className="hierarchical-text-container">
                    <div>
                        <Select
                            options={[
                                {id: 1, label: currentAthlete.sport_name || 'Выберите вид спорта'},
                                {id: 2, label: 'Спортивное программирование'},
                                {id: 3, label: 'Компьютерный спорт'},
                            ]}
                            selectedOptionId={1}
                            setSelectedOptionId={(id) => {
                                if (id) {
                                    handleChange('sport_name', 
                                        id === 1 ? currentAthlete.sport_name : 
                                        id === 2 ? 'Спортивное программирование' : 'Компьютерный спорт'
                                    );
                                }
                            }}
                            style={{width: '100%'}}
                            // disabled={!isEditMode}
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
                        value={currentAthlete.municipality}
                        type="text"
                        className="input-field-with-border-radius input-style-f62::placeholder"
                        onChange={(e) => handleChange('municipality', e.target.value)}
                        // disabled={!isEditMode}
                    />
                </div>
            </div>
            <div className="organization-info-container">
                <p className="header-text-container">Организация</p>
                <div className="hierarchical-text-container">
                    <input 
                        value={currentAthlete.organization} 
                        type="text"
                        className="input-field-with-border-radius input-style-f62::placeholder"
                        onChange={(e) => handleChange('organization', e.target.value)}
                        // disabled={!isEditMode}
                    />
                </div>
            </div>
            <div className="info-block">
                <p className="header-text-container">Присвоить</p>
                <div className="hierarchical-text-container">
                    <Select
                        options={[
                            {id: 1, label: 'Да'},
                            {id: 2, label: 'Нет'},
                        ]}
                        selectedOptionId={currentAthlete.is_sports_category_granted ? 1 : 2}
                        setSelectedOptionId={(number: number | null) => {
                            handleChange('is_sports_category_granted', number === 1);
                        }}
                        style={{width: '100%'}}
                        // disabled={!isEditMode}
                    />
                </div>
            </div>
            <div className="flex-row-with-spacing">
                <p className="header-text-container">Доппинг</p>
                <div className="hierarchical-text-container">
                    <Select
                        options={[
                            {id: 1, label: 'Отрицательно'},
                            {id: 2, label: 'Положительно'},
                        ]}
                        selectedOptionId={currentAthlete.is_doping_check_passed ? 1 : 2}
                        setSelectedOptionId={(number: number | null) => {
                            handleChange('is_doping_check_passed', number === 1);
                        }}
                        style={{width: '100%'}}
                        // disabled={!isEditMode}
                    />
                </div>
            </div>
        </div>
    );
}

export default AthleteFormView;

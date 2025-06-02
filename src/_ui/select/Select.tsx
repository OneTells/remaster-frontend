import styles from "./Select.module.css";

import React, {useEffect, useRef, useState} from "react";

import {SelectOptionType} from "@/_ui/select/_types.tsx";
import {ShowMore} from "@/_assets/show_more.tsx";


type Props = {
    options: SelectOptionType[],
    selectedOptionId: number | null,
    setSelectedOptionId: React.Dispatch<React.SetStateAction<number>>
}

export function Select({options, selectedOptionId, setSelectedOptionId}: Props) {
    const ref = useRef<HTMLDivElement>(null);
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (!ref.current!.contains(event.target as Element)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('click', handleClickOutside);
        return () => document.removeEventListener('click', handleClickOutside);
    }, []);

    const handleSelect = (option: SelectOptionType) => {
        setSelectedOptionId(Number(option.id));
        setIsOpen(false);
    };

    return (
        <div className={styles['container']}>
            <div ref={ref} className={styles['input']} onClick={() => setIsOpen(!isOpen)}>
                {selectedOptionId ? (options.find((option) => option.id === selectedOptionId)?.label) : 'Не выбрано'}
                <div style={{justifyContent: 'flex-end', display: 'flex', flex: 1, marginRight: '3px'}}>
                    <ShowMore style={{width: '14px', height: '14px'}}/>
                </div>
            </div>
            {
                isOpen && (
                    <div className={styles['modal']}>
                        {options.map((option) => (
                            <div key={option.id} className={styles['modal-label']} onClick={() => handleSelect(option)}>
                                {option.label}
                            </div>
                        ))}
                    </div>
                )
            }
        </div>
    );
}

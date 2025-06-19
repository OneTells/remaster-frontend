import styles from "./Select.module.css";

import React, {useEffect, useRef, useState} from "react";

import {SelectOptionType} from "@/_ui/select/_types.tsx";
import {ShowMore} from "@/_assets/show_more.tsx";


type Props = {
    options: SelectOptionType[];
    selectedOptionId: number | null;
    setSelectedOptionId: (id: number) => void;
    style?: React.CSSProperties;
    maxVisibleItems?: number;
    placeholder?: string;
    disabled?: boolean;
    className?: string;
}

export function Select({
    options,
    selectedOptionId,
    setSelectedOptionId,
    style,
    maxVisibleItems = 5,
    placeholder = 'Не выбрано',
    className = '',
}: Props) {
    const ref = useRef<HTMLDivElement>(null);
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (ref.current && !ref.current.contains(event.target as Node)) {
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

    const selectedOption = options.find((option) => option.id === selectedOptionId);

    return (
        <div 
            className={`${styles.container} ${className}`} 
            style={style}
        >
            <div 
                ref={ref} 
                className={`${styles.input} ${isOpen ? styles.open : ''}`} 
                onClick={() => setIsOpen(!isOpen)}
                aria-expanded={isOpen}
            >
                <span className={styles['selected-value']}>
                    {selectedOption?.label || placeholder}
                </span>
                <div className={styles['input-suffix']}>
                    <div className={`${styles.arrow} ${isOpen ? styles.rotated : ''}`}>
                        <ShowMore style={{ width: '14px', height: '14px' }} />
                    </div>
                </div>
            </div>
            
            {isOpen && (
                <div className={`${styles.modal} ${isOpen ? styles.visible : ''}`}>
                    <div 
                        className={styles['options-container']} 
                        style={{ '--max-height': `${maxVisibleItems * 40}px` } as React.CSSProperties}
                    >
                        {options.map((option) => (
                            <div 
                                key={option.id} 
                                className={`${styles['modal-label']} ${
                                    selectedOptionId === option.id ? styles.selected : ''
                                }`} 
                                onClick={() => handleSelect(option)}
                            >
                                {option.label}
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}

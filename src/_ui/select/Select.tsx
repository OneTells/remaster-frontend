import styles from "./Select.module.css";

import React, {useEffect, useMemo, useRef, useState} from "react";

import {SelectOptionType} from "@/_ui/select/_types.tsx";
import {ShowMore} from "@/_assets/show_more.tsx";
import {SearchIcon} from "@/_assets/search_icon.tsx"; // Make sure you have a Search icon component


type Props = {
    options: SelectOptionType[];
    selectedOptionId: number | null;
    setSelectedOptionId: (id: number) => void;
    style?: React.CSSProperties;
    maxVisibleItems?: number;
    placeholder?: string;
    disabled?: boolean;
    className?: string;
    searchable?: boolean;
    searchPlaceholder?: string;
}

export function Select({
                           options,
                           selectedOptionId,
                           setSelectedOptionId,
                           style,
                           maxVisibleItems = 5,
                           placeholder = 'Не выбрано',
                           disabled = false,
                           className = '',
                           searchable = false,
                           searchPlaceholder = 'Поиск...',
                       }: Props) {
    disabled = disabled || options.length === 0;
    const [isOpen, setIsOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const searchInputRef = useRef<HTMLInputElement>(null);
    const ref = useRef<HTMLDivElement>(null);

    const filteredOptions = useMemo(() => {
        if (!searchable || !searchTerm) return options;
        const term = searchTerm.toLowerCase();
        return options.filter(option =>
            option.label.toLowerCase().includes(term)
        );
    }, [options, searchTerm, searchable]);

    useEffect(() => {
        if (disabled) {
            setIsOpen(false);
            return;
        }

        const handleClickOutside = (event: MouseEvent) => {
            if (ref.current && !ref.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('click', handleClickOutside);
        return () => document.removeEventListener('click', handleClickOutside);
    }, [disabled]);

    useEffect(() => {
        if (isOpen && searchable && searchInputRef.current) {
            searchInputRef.current.focus();
        }
    }, [isOpen, searchable]);

    const handleSelect = (option: SelectOptionType) => {
        if (disabled) return;
        setSelectedOptionId(Number(option.id));
        setIsOpen(false);
        setSearchTerm('');
    };

    const handleToggle = () => {
        if (disabled) return;
        setIsOpen(!isOpen);
        if (!isOpen) {
            setSearchTerm('');
        }
    };

    const selectedOption = options.find((option) => option.id === selectedOptionId);

    return (
        <div
            className={`${styles.container} ${className} ${disabled ? styles.disabled : ''}`}
            style={style}
            aria-disabled={disabled}
        >
            <div
                ref={ref}
                className={`${styles.input} ${isOpen ? styles.open : ''} ${disabled ? styles.disabledCursor : ''}`}
                onClick={handleToggle}
                aria-expanded={isOpen}
                aria-disabled={disabled}
            >
                <span className={`${styles['selected-value']} ${disabled ? styles.disabledCursor : ''}`}>
                    {selectedOption?.label || placeholder}
                </span>
                <div className={styles['input-suffix']}>
                    <div className={`${styles.arrow} ${isOpen ? styles.rotated : ''} ${disabled ? styles.disabledCursor : ''}`}>
                        <ShowMore style={{width: '14px', height: '14px'}}/>
                    </div>
                </div>
            </div>

            {isOpen && !disabled && (
                <div className={`${styles.modal} ${isOpen ? styles.visible : ''}`}>
                    {searchable && (
                        <div className={styles.searchContainer}>
                            <div className={styles.searchIcon} style={{height: '16px', width: '16px'}}>
                                <SearchIcon/>
                            </div>
                            <input
                                ref={searchInputRef}
                                type="text"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className={styles.searchInput}
                                placeholder={searchPlaceholder}
                                onClick={(e) => e.stopPropagation()}
                            />
                        </div>
                    )}
                    <div
                        className={styles['options-container']}
                        style={{'--max-height': `${maxVisibleItems * 40}px`} as React.CSSProperties}
                    >
                        {filteredOptions.length > 0 ? (
                            filteredOptions.map((option) => (
                                <div
                                    key={option.id}
                                    className={`${styles['modal-label']} ${
                                        selectedOptionId === option.id ? styles.selected : ''
                                    }`}
                                    onClick={() => handleSelect(option)}
                                >
                                    {option.label}
                                </div>
                            ))
                        ) : (
                            <div className={styles.noResults}>
                                Ничего не найдено
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
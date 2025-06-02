import styles from "./AthletesTable.module.css";

import {Dispatch, SetStateAction, useState} from "react";

import {Pagination} from "@/_ui/pagination/Pagination.tsx";
import {AthleteType} from "@/app/document/_types.tsx";
import {CheckBox} from "@/app/document/components/check-box/CheckBox.tsx";
import {EditIcon} from "@/_assets/edit_icon.tsx";


type Props = {
    athletes: AthleteType[],
    selectIDs: Set<number>,
    setSelectIDs: Dispatch<SetStateAction<Set<number>>>
};

export function AthletesTable({athletes, selectIDs, setSelectIDs}: Props) {
    const itemsPerPage = 8;

    const [currentPage, setCurrentPage] = useState(1);

    const getDisplayItems = (): AthleteType[] => {
        const paginatedItems = athletes.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

        if (paginatedItems.length < itemsPerPage) {
            const emptyItems = Array(itemsPerPage - paginatedItems.length).fill(null);
            return [...paginatedItems, ...emptyItems].slice(0, itemsPerPage);
        }

        return paginatedItems;
    };

    const openModal = () => {
        console.log('openModal');
    };

    return (
        <div className={styles.container}>
            <div className={styles.tableWrapper}>
                <table className={styles.table}>
                    <colgroup>
                        <col style={{width: '5%'}}/>
                        <col style={{width: '25%'}}/>
                        <col style={{width: '15%'}}/>
                        <col style={{width: '15%'}}/>
                        <col style={{width: '15%'}}/>
                        <col style={{width: '10%'}}/>
                        <col style={{width: '10%'}}/>
                        <col style={{width: '5%'}}/>
                    </colgroup>
                    <thead>
                    <tr>
                        <th className={`${styles.tableHeader} ${styles.center}`}></th>
                        <th className={`${styles.tableHeader} ${styles.center}`}>ФИО</th>
                        <th className={`${styles.tableHeader} ${styles.center}`}>Вид спорта</th>
                        <th className={`${styles.tableHeader} ${styles.center}`}>Муницип. обр.</th>
                        <th className={`${styles.tableHeader} ${styles.center}`}>Организация</th>
                        <th className={`${styles.tableHeader} ${styles.center}`}>Присвоить разряд</th>
                        <th className={`${styles.tableHeader} ${styles.center}`}>Тест на допинг</th>
                        <th className={`${styles.tableHeader} ${styles.center}`}></th>
                    </tr>
                    </thead>
                    <tbody>
                    {getDisplayItems().map((doping: AthleteType | null, index: number) => {
                        const isSelected = doping ? selectIDs.has(doping.id) : false;
                        const rowClasses = [
                            styles.tableRow,
                            !doping && styles.empty,
                            isSelected && styles.selected
                        ].filter(Boolean).join(' ');

                        return (
                            <tr key={doping ? `row-${doping.id}` : `empty-${index}`} className={rowClasses}>
                                <td className={`${styles.tableCell} ${styles.checkboxCell}`}>
                                    {doping && (
                                        <CheckBox
                                            checked={isSelected}
                                            onChange={() => {
                                                const newSelection = new Set(selectIDs);
                                                if (isSelected) {
                                                    newSelection.delete(doping.id!);
                                                } else {
                                                    newSelection.add(doping.id!);
                                                }
                                                setSelectIDs(newSelection);
                                            }}
                                        />
                                    )}
                                </td>
                                <td className={styles.tableCell}>
                                    {doping?.fullName || ''}
                                </td>
                                <td className={styles.tableCell}>
                                    {doping?.sportName || ''}
                                </td>
                                <td className={styles.tableCell}>
                                    {doping?.municipality || ''}
                                </td>
                                <td className={styles.tableCell}>
                                    {doping?.organization || ''}
                                </td>
                                <td className={`${styles.tableCell} ${styles.center} ${
                                    doping ? (doping.isSportsCategoryGranted ? styles.statusGranted : styles.statusNotGranted) : ''
                                }`}>
                                    {doping ? (doping.isSportsCategoryGranted ? 'Да' : 'Нет') : ''}
                                </td>
                                <td className={`${styles.tableCell} ${styles.center} ${
                                    doping ? (doping.isDopingCheckPassed ? styles.statusGranted : styles.statusNotGranted) : ''
                                }`}>
                                    {doping ? (doping.isDopingCheckPassed ? 'Отр.' : 'Пол.') : ''}
                                </td>
                                <td className={`${styles.tableCell} ${styles.center}`} onClick={openModal}>
                                    {doping ? <EditIcon/> : ''}
                                </td>
                            </tr>
                        );
                    })}
                    </tbody>
                </table>
            </div>
            <Pagination
                currentPage={currentPage}
                maxPages={Math.max(1, Math.ceil(athletes.length / itemsPerPage))}
                onPageChange={setCurrentPage}
            />
        </div>
    );
}

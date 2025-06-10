import styles from "./AthletesTable.module.css";

import {Dispatch, SetStateAction, useEffect, useState} from "react";

import {Pagination} from "@/_ui/pagination/Pagination.tsx";
import {AthleteType, SportType} from "@/app/document/_types.tsx";
import {CheckBox} from "@/app/document/_components/check-box/CheckBox.tsx";
import {EditIcon} from "@/_assets/edit_icon.tsx";


type Props = {
    athletes: AthleteType[];
    sports: SportType[];

    selectIDs: Set<number>;
    setSelectIDs: Dispatch<SetStateAction<Set<number>>>;

    athleteModalOpen?: (id: number) => () => void;
};

export function AthletesTable({athletes, selectIDs, setSelectIDs, athleteModalOpen, sports}: Props) {
    const itemsPerPage = 8;

    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        setCurrentPage(1);
    }, [athletes]);

    const getDisplayItems = (): AthleteType[] => {
        const paginatedItems = athletes.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

        if (paginatedItems.length < itemsPerPage) {
            const emptyItems = Array(itemsPerPage - paginatedItems.length).fill(null);
            return [...paginatedItems, ...emptyItems].slice(0, itemsPerPage);
        }

        return paginatedItems;
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
                            !doping && styles.empty
                        ].filter(Boolean).join(' ');

                        const sportName = (doping && sports.find(sport => sport.id === doping.sport_id)?.name) || '';

                        return (
                            <tr key={doping ? `row-${doping.id}` : `empty-${index}`} className={rowClasses}>
                                <td className={`${styles.tableCell} ${styles.center}`}>
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
                                <td className={styles.tableCell} title={doping?.full_name}>
                                    {doping?.full_name || ''}
                                </td>
                                <td className={styles.tableCell} title={sportName}>
                                    {sportName}
                                </td>
                                <td className={styles.tableCell} title={doping?.municipality}>
                                    {doping?.municipality || ''}
                                </td>
                                <td className={styles.tableCell} title={doping?.organization}>
                                    {doping?.organization || ''}
                                </td>
                                <td className={`${styles.tableCell} ${styles.center} ${
                                    doping ? (doping.is_sports_category_granted ? styles.statusGranted : styles.statusNotGranted) : ''
                                }`}>
                                    {doping ? (doping.is_sports_category_granted ? 'Да' : 'Нет') : ''}
                                </td>
                                <td className={`${styles.tableCell} ${styles.center} ${
                                    doping ? (doping.is_doping_check_passed ? styles.statusGranted : styles.statusNotGranted) : ''
                                }`}>
                                    {doping ? (doping.is_doping_check_passed ? 'Отр.' : 'Пол.') : ''}
                                </td>
                                <td
                                    className={`${styles.tableCell} ${styles.center}`}
                                    onClick={(doping && athleteModalOpen) ? athleteModalOpen(doping.id) : undefined}
                                >
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

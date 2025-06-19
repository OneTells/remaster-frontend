import styles from "./Doping.module.css";

import {useEffect, useState} from "react";

import {DopingAthleteType} from "@/app/doping-athletes/_types.tsx";
import {Pagination} from "@/_ui/pagination/Pagination.tsx";
import {CheckBox} from "@/app/document/_components/check-box/CheckBox.tsx";


const itemsPerPage = 7;

type Props = {
    dopingAthletes: DopingAthleteType[];

    selectId: number | null;
    setSelectId: (value: number | null) => void;
}

export function Doping({dopingAthletes, selectId, setSelectId}: Props) {
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        setCurrentPage(1);
    }, [dopingAthletes]);

    const getDisplayItems = (): DopingAthleteType[] => {
        const paginatedItems = dopingAthletes.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

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
                        <col style={{width: '20%'}}/>
                        <col style={{width: '14%'}}/>
                        <col style={{width: '8%'}}/>
                        <col style={{width: '14%'}}/>
                        <col style={{width: '14%'}}/>
                    </colgroup>
                    <thead>
                    <tr>
                        <th className={`${styles.tableHeader} ${styles.center}`}></th>
                        <th className={`${styles.tableHeader} ${styles.center}`}>ФИО</th>
                        <th className={`${styles.tableHeader} ${styles.center}`}>Вид спорта</th>
                        <th className={`${styles.tableHeader} ${styles.center}`}>Дата рождения</th>
                        <th className={`${styles.tableHeader} ${styles.center}`}>Срок</th>
                        <th className={`${styles.tableHeader} ${styles.center}`}>Дата начала</th>
                        <th className={`${styles.tableHeader} ${styles.center}`}>Дата окончания</th>
                    </tr>
                    </thead>
                    <tbody>
                    {getDisplayItems().map((dopingAthlete: DopingAthleteType | null, index: number) => {
                        const rowClasses = [
                            styles.tableRow,
                            !dopingAthlete && styles.empty
                        ].filter(Boolean).join(' ');

                        return (
                            <tr key={dopingAthlete ? `row-${dopingAthlete?.id}` : `empty-${index}`} className={rowClasses}>
                                <td className={`${styles.tableCell} ${styles.center}`}>
                                    {dopingAthlete && (
                                        <CheckBox
                                            checked={selectId == dopingAthlete.id}
                                            onChange={
                                                () => setSelectId(selectId === dopingAthlete.id ? null : dopingAthlete.id)
                                            }
                                        />
                                    )}
                                </td>
                                <td className={styles.tableCell} title={dopingAthlete?.full_name || ''}>
                                    {dopingAthlete?.full_name || ''}
                                </td>
                                <td className={styles.tableCell}>
                                    {dopingAthlete?.sport || ''}
                                </td>
                                <td className={`${styles.tableCell} ${styles.center}`}>
                                    {dopingAthlete?.birth_date || ''}
                                </td>
                                <td
                                    className={`${styles.tableCell} ${styles.center}`}
                                    title={dopingAthlete?.disqualification_duration.replace('Пожизненно', 'Ꝏ') || ''}
                                >
                                    {dopingAthlete?.disqualification_duration.replace('Пожизненно', 'Ꝏ') || ''}
                                </td>
                                <td className={`${styles.tableCell} ${styles.center}`}>
                                    {dopingAthlete?.disqualification_start || ''}
                                </td>
                                <td className={`${styles.tableCell} ${styles.center}`}>
                                    {dopingAthlete?.disqualification_end.replace('None', 'Пожизненно') || ''}
                                </td>
                            </tr>
                        );
                    })}
                    </tbody>
                </table>
            </div>
            <Pagination
                currentPage={currentPage}
                maxPages={Math.max(1, Math.ceil(dopingAthletes.length / itemsPerPage))}
                onPageChange={setCurrentPage}
            />
        </div>
    );
}
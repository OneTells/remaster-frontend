import styles from "./AthletesTable.module.css";

import {useState} from "react";

import {Pagination} from "@/_ui/pagination/Pagination.tsx";
import {AthleteType} from "@/app/document/_types.tsx";


export function AthletesTable() {
    const itemsPerPage = 8;

    const [currentPage, setCurrentPage] = useState(1);

    const getDisplayItems = (): AthleteType[] => {
        return Array(itemsPerPage).fill(null);
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
                        const rowClasses = [
                            styles.tableRow,
                            styles.empty
                        ].filter(Boolean).join(' ');

                        return (
                            <tr key={doping ? `row-${doping.id}` : `empty-${index}`} className={rowClasses}>
                                <td className={`${styles.tableCell} ${styles.center}`}>
                                </td>
                                <td className={styles.tableCell}>
                                </td>
                                <td className={styles.tableCell}>
                                </td>
                                <td className={styles.tableCell}>
                                </td>
                                <td className={styles.tableCell}>
                                </td>
                                <td className={`${styles.tableCell} ${styles.center}`}>
                                </td>
                                <td className={`${styles.tableCell} ${styles.center}`}>
                                </td>
                                <td className={`${styles.tableCell} ${styles.center}`}>
                                </td>
                            </tr>
                        );
                    })}
                    </tbody>
                </table>
            </div>
            <Pagination
                currentPage={currentPage}
                maxPages={1}
                onPageChange={setCurrentPage}
            />
        </div>
    );
}

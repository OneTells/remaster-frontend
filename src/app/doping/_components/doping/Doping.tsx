'use client'
import styles from "./Doping.module.css";
import { DopingType } from "@/app/doping/_types"

interface DopingProps {
    dopings: DopingType[];
}

export function Doping({ dopings }: DopingProps) {
    // const formatPeriod = (period: PeriodType) => {
    //     return `${period.period} ${getUnitName(period.unit)}`;
    // };

    if (dopings.length === 0) {
        return (
            <div className="text-center py-8 text-gray-500 text-lg">
                Нет данных для отображения
            </div>
        );
    }

    return (
        <div className={styles["container"]}>
            <table>
                <thead>
                    <tr>
                        <th>№</th>
                        <th>ФИО</th>
                        <th>Вид спорта</th>
                        <th>Дата рождения</th>
                        <th>Вид нарушения / класс запрещённой субстанции</th>
                        <th>Срок дисквалификации</th>
                        <th>Дата начала дисквалификации</th>
                        <th>Дата окончания дисквалификации</th>
                    </tr>
                </thead>
                <tbody>
                    {dopings.map((doping) => (
                    <tr key={doping.id}>
                        <td>{doping.id}</td>
                        <td>{doping.fullName}</td>
                        <td>{doping.sportType}</td>
                        <td>
                            {doping.birthDate.toLocaleDateString('ru-RU', {
                                day: '2-digit',
                                month: '2-digit',
                                year: 'numeric'
                            })}
                        </td>
                        <td>{doping.violationType}</td>
                        <td>
                            {doping.ineligibilityPeriod.period + " " + doping.ineligibilityPeriod.unit}
                        </td>
                        <td>
                            {doping.ineligibilityStart.toLocaleDateString('ru-RU', {
                                day: '2-digit',
                                month: '2-digit',
                                year: 'numeric'
                            })}
                        </td>
                        <td>
                            {doping.ineligibilityEnd.toLocaleDateString('ru-RU', {
                                day: '2-digit',
                                month: '2-digit',
                                year: 'numeric'
                            })}
                        </td>
                    </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
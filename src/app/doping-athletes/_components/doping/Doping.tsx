import styles from "./Doping.module.css";

import {DopingAthleteType} from "@/app/doping-athletes/_types.tsx";


type Props = {
    dopingAthletes: DopingAthleteType[];
}

export function Doping({dopingAthletes}: Props) {
    // const formatPeriod = (period: PeriodType) => {
    //     return `${period.period} ${getUnitName(period.unit)}`;
    // };

    // if (dopingAthletes.length === 0) {
    //     return (
    //         <div className="text-center py-8 text-gray-500 text-lg">
    //             Нет данных для отображения
    //         </div>
    //     );
    // }

    return (
        <div className={styles["container"]}>
            <table>
                <thead>
                <tr>
                    <th>№</th>
                    <th>ФИО</th>
                    <th>Вид спорта</th>
                    <th>Дата рождения</th>
                    <th>Срок дисквалификации</th>
                    <th>Дата начала дисквалификации</th>
                    <th>Дата окончания дисквалификации</th>
                </tr>
                </thead>
                <tbody>
                {dopingAthletes.map((doping) => (
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
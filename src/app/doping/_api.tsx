import {DopingType} from "@/app/doping/_types.tsx";

let dopings = [
        {id: 1, fullName: 'Тимохов Кирилл', sportType: 'Баскетбол',
    birthDate: new Date(2004, 4, 26),
    violationType: 'Героин',
    ineligibilityPeriod: {period: 3, unit: 'дня'},
    ineligibilityStart: new Date(2025, 5, 12),
    ineligibilityEnd: new Date(2025, 5, 15)},
        {id: 2, fullName: 'Егор Копытов', sportType: 'Лёгкая атлетика',
    birthDate: new Date(2004, 2, 13),
    violationType: 'Амфетомин',
    ineligibilityPeriod: {period: 2, unit: 'дня'},
    ineligibilityStart: new Date(2025, 5, 17),
    ineligibilityEnd: new Date(2025, 5, 19)},
        {id: 3, fullName: 'Артём Мяконьких', sportType: 'Тяжёлая атлетика',
    birthDate: new Date(2004, 6, 7),
    violationType: 'Спайс',
    ineligibilityPeriod: {period: 22, unit: 'года'},
    ineligibilityStart: new Date(2025, 6, 3),
    ineligibilityEnd: new Date(2047, 6, 3)},
        {id: 4, fullName: 'Куплевацкий Дмитрий', sportType: 'Плаванье',
    birthDate: new Date(2004, 12, 1),
    violationType: 'Виагра',
    ineligibilityPeriod: {period: 1, unit: 'месяц'},
    ineligibilityStart: new Date(2026, 6, 22),
    ineligibilityEnd: new Date(2026, 7, 22)}
]

// export async function deleteDocument(ids: Set<number>) {
//     dopings = dopings.filter((document) => !ids.has(document.id))
// }

export async function getDopings(): Promise<DopingType[]> {
    return dopings
}
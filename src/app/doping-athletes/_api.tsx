import {DopingAthleteType} from "@/app/doping-athletes/_types.tsx";


let dopingAthletes = [
    {
        id: 1, fullName: 'Тимохов Кирилл', sportType: 'Баскетбол',
        birthDate: '31.12.2001',
        violationType: 'Героин',
        ineligibilityPeriod: '2 дня',
        ineligibilityStart: '31.12.2001',
        ineligibilityEnd: '31.12.2001'
    },
    {
        id: 2, fullName: 'Егор Копытов', sportType: 'Лёгкая атлетика',
        birthDate: '31.12.2001',
        violationType: 'Амфетомин',
        ineligibilityPeriod: '2 дня',
        ineligibilityStart: '31.12.2001',
        ineligibilityEnd: '31.12.2001'
    },
    {
        id: 3, fullName: 'Артём Мяконьких', sportType: 'Тяжёлая атлетика',
        birthDate: '31.12.2001',
        violationType: 'Спайс',
        ineligibilityPeriod: '2 дня',
        ineligibilityStart: '31.12.2001',
        ineligibilityEnd: '31.12.2001'
    },
    {
        id: 4, fullName: 'Куплевацкий Дмитрий', sportType: 'Плаванье',
        birthDate: '31.12.2001',
        violationType: 'Виагра',
        ineligibilityPeriod: '2 дня',
        ineligibilityStart: '31.12.2001',
        ineligibilityEnd: '31.12.2001'
    },
    {
        id: 5, fullName: 'Куплевацкий Дмитрий', sportType: 'Плаванье',
        birthDate: '31.12.2001',
        violationType: 'Виагра',
        ineligibilityPeriod: '2 дня',
        ineligibilityStart: '31.12.2001',
        ineligibilityEnd: '31.12.2001'
    },
    {
        id: 6, fullName: 'Куплевацкий Дмитрий', sportType: 'Плаванье',
        birthDate: '31.12.2001',
        violationType: 'Виагра',
        ineligibilityPeriod: '2 дня',
        ineligibilityStart: '31.12.2001',
        ineligibilityEnd: '31.12.2001'
    },
    {
        id: 7, fullName: 'Куплевацкий Дмитрий', sportType: 'Плаванье',
        birthDate: '31.12.2001',
        violationType: 'Виагра',
        ineligibilityPeriod: '2 дня',
        ineligibilityStart: '31.12.2001',
        ineligibilityEnd: '31.12.2001'
    },
    {
        id: 8, fullName: 'Куплевацкий Дмитрий', sportType: 'Плаванье',
        birthDate: '31.12.2001',
        violationType: 'Виагра',
        ineligibilityPeriod: '2 дня',
        ineligibilityStart: '31.12.2001',
        ineligibilityEnd: '31.12.2001'
    },
    {
        id: 9, fullName: 'Куплевацкий Дмитрий', sportType: 'Плаванье',
        birthDate: '31.12.2001',
        violationType: 'Виагра',
        ineligibilityPeriod: '2 дня',
        ineligibilityStart: '31.12.2001',
        ineligibilityEnd: '31.12.2001'
    },
    {
        id: 10, fullName: 'Куплевацкий Дмитрий', sportType: 'Плаванье',
        birthDate: '31.12.2001',
        violationType: 'Виагра',
        ineligibilityPeriod: '2 дня',
        ineligibilityStart: '31.12.2001',
        ineligibilityEnd: '31.12.2001'
    },
    {
        id: 11, fullName: 'Куплевацкий Дмитрий', sportType: 'Плаванье',
        birthDate: '31.12.2001',
        violationType: 'Виагра',
        ineligibilityPeriod: '2 дня',
        ineligibilityStart: '31.12.2001',
        ineligibilityEnd: '31.12.2001'
    },
    {
        id: 12, fullName: 'Куплевацкий Дмитрий', sportType: 'Плаванье',
        birthDate: '31.12.2001',
        violationType: 'Виагра',
        ineligibilityPeriod: '2 дня',
        ineligibilityStart: '31.12.2001',
        ineligibilityEnd: '31.12.2001'
    }
]

export async function getDopingAthletes(): Promise<DopingAthleteType[]> {
    return dopingAthletes
}

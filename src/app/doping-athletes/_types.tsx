export type DopingAthleteType = {
    id: number,
    fullName: string,
    sportType: string,
    birthDate: Date,
    violationType: string,
    ineligibilityPeriod: PeriodType
    ineligibilityStart: Date,
    ineligibilityEnd: Date,
}

export type PeriodType = {
    period: number,
    unit: string
}

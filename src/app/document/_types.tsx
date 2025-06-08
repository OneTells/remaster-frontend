export type AthleteType = {
    id: number,

    full_name: string,
    birth_date: string,
    sport_id: number,

    municipality: string,
    organization: string,

    is_sports_category_granted: boolean,
    is_doping_check_passed: boolean
}

export type DocumentType = {
    id: number,
    title: string,
    sports_category_id: number,
    athletes: AthleteType[]
}

export type SportType = {
    id: number,
    name: string
}

export type ActionBarUIDocumentType = {
    title: string,
    sports_category_id: number | null
}

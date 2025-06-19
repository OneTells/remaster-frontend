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

export type ActionBarDocumentType = {
    title: string,
    sports_category_id: number | null
}

export type DopingCheckerType = {
    full_name: string;
    selectId: number | null;
}

export type ResultCheckerType = {

}

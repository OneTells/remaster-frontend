export type AthleteType = {
    id: number,

    fullName: string,
    sportName: string,

    municipality: string,
    organization: string,

    isSportsCategoryGranted: boolean,
    isDopingCheckPassed: boolean,
}

export type DocumentType = {
    id: number,
    title: string,
    sportsRankId: number,
    athletes: AthleteType[],
}

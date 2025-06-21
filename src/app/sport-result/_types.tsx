export type CompetitionStatusType = {
    id: number;
    name: string;
}

type DisciplineType = {
    id: number;
    name: string;
}

export type SportsProgrammingDataType = {
    competition_statuses: CompetitionStatusType[];
}

export type ComputerSportsType = {
    competition_statuses: CompetitionStatusType[];
    disciplines: DisciplineType[];
    disciplines_with_mandatory_participation: number[];
}

export type InitDataType = ComputerSportsType | SportsProgrammingDataType;

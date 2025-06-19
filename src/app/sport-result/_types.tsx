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
}

export type InitDataType = ComputerSportsType | SportsProgrammingDataType;

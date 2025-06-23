import {ModuleType} from "@/app/document/_types.tsx";
import {getModuleData} from "@/app/sport-result/_api.tsx";


export type SportResultDataType = {
    module: ModuleType | null;
    sportCategoryId: number | null;
}

export type ModuleDataType<T> = {
    initData: Awaited<ReturnType<typeof getModuleData>> | null;
    state: T;
}

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
    disciplines: DisciplineType[];
}

export type ComputerSportsType = {
    competition_statuses: CompetitionStatusType[];
    disciplines: DisciplineType[];
    disciplines_with_mandatory_participation: number[];
}

export type AthleticsPlaceType = {
    competition_statuses: CompetitionStatusType[];
    disciplines: DisciplineType[];
    disciplines_with_minimum_number_of_participants: number[];
}

export type AthleticsResultType = {}

export type InitDataType = (
    ComputerSportsType
    | SportsProgrammingDataType
    | AthleticsPlaceType
    | AthleticsResultType
    );

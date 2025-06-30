import {ModuleType} from "@/app/document/_types.tsx";


export type CompetitionStatusType = {
    id: number;
    name: string;
}

export type DisciplineType = {
    id: number;
    name: string;
}

export type DisciplineContentType = {
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

export type AthleticsResultType = {id: number, name: string}[]

export type InitDataType = (
    ComputerSportsType
    | SportsProgrammingDataType
    | AthleticsPlaceType
    | AthleticsResultType
    );

export type ModuleProps<DataType, InitDataType> = {
    module: ModuleType;
    sportCategoryId: number;

    initData: InitDataType;

    state: Partial<DataType>
    updateState: (state: Partial<DataType>) => void;

    sendDataForCheck: (data: any | null) => Promise<void>;
}

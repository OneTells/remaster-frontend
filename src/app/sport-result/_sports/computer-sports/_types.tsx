export type SubjectType = {
    subject_from: number;
    subject_to: number | null;
}

export type AdditionalConditionType = {
    subject: SubjectType | null;
    min_won_matches: number | null;
}

export type AdditionalConditionsType = {
    is_internally_subject: boolean;
    additional_conditions: AdditionalConditionType[];
}

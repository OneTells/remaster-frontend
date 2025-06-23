export type AdditionalConditionType = {
    subject_from: number | null;
    min_participants: number | null;
}

export type AdditionalConditionsType = {
    is_internally_subject: boolean;
    additional_conditions: AdditionalConditionType[];
}

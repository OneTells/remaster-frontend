export type AdditionalConditionType = {
    id: number;
    name: string;
}

export type AdditionalConditionsType = {
    system_count: 'meter' | 'second';
    contents: AdditionalConditionType[];
}

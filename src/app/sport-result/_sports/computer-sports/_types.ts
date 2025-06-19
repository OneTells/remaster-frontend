export type SubjectType = {
    subject_from: number
    subject_to: number | null
}

export type SubjectsType = {
    is_internally_subject: boolean | null;
    subjects: SubjectType[];
}
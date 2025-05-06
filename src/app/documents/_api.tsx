import {DocumentType} from "@/app/documents/_types.tsx";

let documents = [
    {id: 1, title: 'asas'},
    {id: 2, title: 'sds'},
    {id: 3, title: 'sds'},
    {id: 4, title: 'sds'},
    {id: 5, title: 'sds'},
    {id: 6, title: 'sds'},
    {id: 7, title: 'sds'},
    {id: 8, title: 'sds'},
    {id: 9, title: 'sds'},
    {id: 10, title: 'sds'},
    {id: 11, title: 'sds'},
    {id: 12, title: 'sds'},
    {id: 13, title: 'sds'},
    {id: 14, title: 'sds'},
    {id: 15, title: 'sds'},
    {id: 16, title: 'sds'},
    {id: 17, title: 'sds'},
    {id: 18, title: 'sds'},
    {id: 19, title: 'sds'},
    {id: 20, title: 'sds'},
    {id: 21, title: 'sds'},
    {id: 22, title: 'sds'},
    {id: 23, title: 'sds'},
    {id: 24, title: 'sds'},
    {id: 25, title: 'sds'},
    {id: 26, title: 'sds'},
    {id: 27, title: 'sds'},
    {id: 28, title: 'sds'},
    {id: 29, title: 'sds'},
    {id: 30, title: 'sds'},
    {id: 31, title: 'asas'}
]

export async function deleteDocument(ids: Set<number>) {
    documents = documents.filter((document) => !ids.has(document.id))
}

export async function getDocuments(): Promise<DocumentType[]> {
    return documents
}

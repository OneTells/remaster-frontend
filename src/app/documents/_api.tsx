import {DocumentType} from "@/app/documents/_types.tsx";


let documents = Array.from({length: 30}, (_, index) => ({
    id: index + 1,
    title: `Документ №${index + 1} от ${new Date().toLocaleDateString()}`
}))

export async function deleteDocument(ids: Set<number>): Promise<void> {
    documents = documents.filter((document) => !ids.has(document.id))
}

export async function getDocuments(): Promise<DocumentType[]> {
    return documents
}

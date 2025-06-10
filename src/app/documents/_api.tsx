import {DocumentType} from "@/app/documents/_types.tsx";
import {API_URL} from "@/config.tsx";


export async function deleteDocuments(ids: Set<number>): Promise<void> {
    for (const id of ids) {
        await fetch(`${API_URL}/documents/${id}`, {method: 'DELETE'});
    }
}

export async function getDocuments(): Promise<DocumentType[]> {
    const response = await fetch(`${API_URL}/documents/`)
    return (await response.json()).data
}

export async function createDocumentFromFile(path: string): Promise<void> {
    await fetch(
        `${API_URL}/documents/file`,
        {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({'path': path})
        }
    )
}

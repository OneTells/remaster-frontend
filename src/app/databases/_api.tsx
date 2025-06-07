import {DatabasesType} from "@/app/databases/_types.tsx";
import {API_URL} from "@/config.tsx";


export async function getDatabases(): Promise<DatabasesType[]> {
    const response = await fetch(`${API_URL}/databases`)
    return (await response.json()).data
}

export async function uploadDatabase(slug: string, path: string): Promise<void> {
    await fetch(
        `${API_URL}/databases/${slug}/upload`,
        {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({'path': path})
        }
    )
}

export async function downloadDatabase(slug: string, path: string): Promise<void> {
    await fetch(
        `${API_URL}/databases/${slug}/download`,
        {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({'path': path})
        }
    )
}

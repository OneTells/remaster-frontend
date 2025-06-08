import {API_URL} from "@/config.tsx";


export async function createDocument(title: string, sportsRankId: number): Promise<number> {
    const response = await fetch(
        `${API_URL}/documents`,
        {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({'title': title, 'sports_category_id': sportsRankId})
        }
    );

    return (await response.json()).data.id
}

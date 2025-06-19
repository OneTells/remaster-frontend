import {API_URL} from "@/config.tsx";
import {InitDataType} from "@/app/sport-result/_types.tsx";

export async function getSportData(sportId: number): Promise<InitDataType> {
    const response = await fetch(`${API_URL}/sports/${sportId}/data`)
    return (await response.json()).data
}

export async function checkResult(sportId: number, data: any): Promise<boolean> {
    const response = await fetch(
        `${API_URL}/sports/${sportId}/check-result`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(data)
        }
    )
    return (await response.json()).data.is_sports_category_granted
}
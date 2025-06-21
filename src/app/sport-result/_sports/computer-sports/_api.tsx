import {AdditionalConditionsType} from "@/app/sport-result/_sports/computer-sports/_types.tsx";
import {API_URL} from "@/config.tsx";


export async function getAdditionalConditionsData(sportId: number, data: any): Promise<AdditionalConditionsType> {
    const response = await fetch(`${API_URL}/sports/${sportId}/additional-conditions`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data)
    })
    return (await response.json()).data;
}
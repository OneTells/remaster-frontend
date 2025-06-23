import {API_URL} from "@/config.tsx";
import {AdditionalConditionsType} from "@/app/sport-result/_sports/athletics-place/_types.tsx";


export async function getAdditionalConditionsData(moduleId: number, data: any): Promise<AdditionalConditionsType> {
    const response = await fetch(`${API_URL}/modules/${moduleId}/additional-conditions`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data)
    })
    return (await response.json()).data;
}
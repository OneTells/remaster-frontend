import {API_URL} from "@/config.tsx";
import {InitDataType} from "@/app/sport-result/_types.tsx";

export async function getModuleData(moduleId: number): Promise<InitDataType> {
    const response = await fetch(`${API_URL}/modules/${moduleId}/data`)
    return (await response.json()).data
}

export async function checkResult(moduleId: number, data: any): Promise<boolean> {
    const response = await fetch(
        `${API_URL}/modules/${moduleId}/check-result`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(data)
        }
    )
    return (await response.json()).data.is_sports_category_granted
}
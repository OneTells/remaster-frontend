import {DopingAthleteType} from "@/app/doping-athletes/_types.tsx";
import {API_URL} from "@/config.tsx";


export async function getDopingAthletes(): Promise<DopingAthleteType[]> {
    const response = await fetch(`${API_URL}/doping-athletes/`);
    return (await response.json()).data
}

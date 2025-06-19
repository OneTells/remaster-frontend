import {AthleteType, DocumentType, DopingCheckerType, ResultCheckerType, SportType} from "@/app/document/_types.tsx";
import {API_URL} from "@/config.tsx";


export async function getDocument(id: number): Promise<DocumentType> {
    const response = await fetch(`${API_URL}/documents/${id}`)
    return (await response.json()).data
}

export async function updateDocument(id: number, title: string, sportsRankId: number): Promise<void> {
    await fetch(
        `${API_URL}/documents/${id}`,
        {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({'title': title, 'sports_category_id': sportsRankId})
        }
    );
}


export async function createOrder(documentId: number, path: string): Promise<void> {
    await fetch(
        `${API_URL}/documents/${documentId}/orders`,
        {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({'path': path})
        }
    );
}

export async function updateAthletes(athlete_id: number, data: AthleteType): Promise<void> {
    await fetch(
        `${API_URL}/athletes/${athlete_id} `,
        {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(
                {
                    "full_name": data.full_name,
                    "birth_date": data.birth_date,
                    "sport_id": data.sport_id,
                    "municipality": data.municipality,
                    "organization": data.organization,
                    "is_sports_category_granted": data.is_sports_category_granted,
                    "is_doping_check_passed": data.is_doping_check_passed,
                }
            )
        }
    );
}

export async function createAthlete(documentId: number, data: AthleteType): Promise<void> {
    await fetch(
        `${API_URL}/documents/${documentId}/athletes`,
        {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(
                {
                    "document_id": documentId,
                    "full_name": data.full_name,
                    "birth_date": data.birth_date,
                    "sport_id": 1,
                    "municipality": data.municipality,
                    "organization": data.organization,
                    "is_sports_category_granted": data.is_sports_category_granted,
                    "is_doping_check_passed": data.is_doping_check_passed,
                    "created_at": "23"
                }
            )
        }
    );
}

export async function getSports(): Promise<SportType[]> {
    const response = await fetch(`${API_URL}/sports/`)
    return (await response.json()).data
}

export async function downloadDocument(documentId: number, path: string): Promise<void> {
    await fetch(
        `${API_URL}/documents/${documentId}/file`,
        {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({'path': path})
        }
    );
}

export async function removeAthletes(athleteIds: number[]): Promise<void> {
    for (const athleteId of athleteIds) {
        await fetch(`${API_URL}/athletes/${athleteId}`, {method: 'DELETE'});
    }
}

export async function downloadAthletes(athleteIDs: number[], path: string): Promise<void> {
    await fetch(
        `${API_URL}/athletes/file`,
        {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({'athlete_ids': athleteIDs, 'path': path})
        }
    );
}

export async function uploadAthletes(documentId: number, path: string): Promise<void> {
    await fetch(
        `${API_URL}/documents/${documentId}/athletes/file`,
        {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({'path': path})
        }
    );
}

export async function getDopingCheckerData(athleteID: number): Promise<DopingCheckerType | null> {
    const response = await fetch(`${API_URL}/athletes/${athleteID}/doping`);
     return (await response.json()).data
}

export async function getResultCheckerData(athleteID: number): Promise<ResultCheckerType | null> {
    const response = await fetch(`${API_URL}/athletes/${athleteID}/result`);
     return (await response.json()).data
}

export async function updateCheckerData(slug: string, athleteID: number, data: DopingCheckerType | ResultCheckerType): Promise<void> {
    await fetch(
        `${API_URL}/athletes/${athleteID}/${slug}`,
        {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(data)
        }
    );
}

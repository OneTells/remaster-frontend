import {useLocation} from "react-router";

import {getDocuments} from "@/app/documents/_api.tsx";
import {getDopingAthletes} from "@/app/doping-athletes/_api.tsx";
import {getDatabases} from "@/app/databases/_api.tsx";
import {SportType} from "@/app/document/_types.tsx";
import {getDocument} from "@/app/document/_api.tsx";


type DataType = (
    Awaited<ReturnType<(
        typeof getDocuments
        | typeof getDopingAthletes
        | typeof getDatabases
        )>>
    | { sports: SportType[] }
    | { sports: SportType[], document: Awaited<ReturnType<typeof getDocument>> }
    )

export function useNavigationData<T extends DataType>(): T {
    const location = useLocation();
    return location.state! as T;
}
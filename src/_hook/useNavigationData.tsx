import {useLocation} from "react-router";

import {getDocuments} from "@/app/documents/_api.tsx";
import {getDopingAthletes} from "@/app/doping-athletes/_api.tsx";
import {getDatabases} from "@/app/databases/_api.tsx";
import {ModuleType, SportType} from "@/app/document/_types.tsx";
import {getDocument, getModules, getMunicipalities, getOrganizations} from "@/app/document/_api.tsx";


type DataType = (
    Awaited<ReturnType<(
        typeof getDocuments
        | typeof getDopingAthletes
        | typeof getDatabases
        )>>
    | {}
    | { modules: ModuleType[] }
    | {
    sports: SportType[],
    document: Awaited<ReturnType<typeof getDocument>>,
    dopingAthletes: Awaited<ReturnType<typeof getDopingAthletes>>,
    organizations: Awaited<ReturnType<typeof getOrganizations>>,
    municipalities: Awaited<ReturnType<typeof getMunicipalities>>,
    modules: Awaited<ReturnType<typeof getModules>>,
}
    )

export function useNavigationData<T extends Partial<DataType>>(): T {
    const location = useLocation();
    return location.state! as T;
}
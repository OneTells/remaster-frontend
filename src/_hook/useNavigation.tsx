import {useNavigate} from "react-router";

import {getDocuments} from "@/app/documents/_api.tsx";
import {getDopingAthletes} from "@/app/doping-athletes/_api.tsx";
import {getDatabases} from "@/app/databases/_api.tsx";
import {getDocument, getModules, getMunicipalities, getOrganizations, getSports} from "@/app/document/_api.tsx";


export const useNavigation = () => {
    const navigate = useNavigate();

    return (
        async (to: string, params?: any) => {
            let state;

            if (to === '/documents') {
                state = await getDocuments()
            } else if (to === '/doping-athletes') {
                state = await getDopingAthletes()
            } else if (to === '/databases') {
                state = await getDatabases()
            } else if (to === '/documents/new') {
                state = {};
            } else if (to === '/sport-result') {
                const modules = await getModules();
                state = {modules: modules};
            } else if (to.startsWith('/documents/')) {
                const [document, sports, dopingAthletes, organizations, municipalities] = await Promise.all([
                    getDocument(params['id']),
                    getSports(),
                    getDopingAthletes(),
                    getOrganizations(),
                    getMunicipalities()
                ]);
                state = {
                    sports: sports,
                    document: document,
                    dopingAthletes: dopingAthletes,
                    organizations: organizations,
                    municipalities: municipalities
                };
            }

            await navigate(to, {state: state});
        }
    );
};
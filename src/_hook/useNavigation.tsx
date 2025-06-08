import {useNavigate} from "react-router";

import {getDocuments} from "@/app/documents/_api.tsx";
import {getDopingAthletes} from "@/app/doping-athletes/_api.tsx";
import {getDatabases} from "@/app/databases/_api.tsx";
import {getDocument, getSports} from "@/app/document/_api.tsx";


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
                const sports = await getSports();
                state = {sports: sports};
            } else if (to === '/sport-result') {

            } else if (to.startsWith('/documents/')) {
                const document = await getDocument(params['id'])
                const sports = await getSports();
                state = {sports: sports, document: document};
            }

            await navigate(to, {state: state});
        }
    );
};
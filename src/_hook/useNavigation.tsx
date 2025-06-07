import {use} from "react";
import {useNavigate} from "react-router";

import {NavigationContext} from "@/_context/navigation-context.tsx";
import {getDocuments} from "@/app/documents/_api.tsx";
import {getDopingAthletes} from "@/app/doping-athletes/_api.tsx";
import {getDatabases} from "@/app/databases/_api.tsx";
import {getDocument} from "@/app/document/_api.tsx";


export const useNavigation = () => {
    const navigate = useNavigate();
    const [_, setState] = use(NavigationContext);

    return (
        async (to: string, params?: any) => {
            if (to === '/documents') {
                const data = await getDocuments()
                setState(data);
            } else if (to === '/doping-athletes') {
                const data = await getDopingAthletes()
                setState(data);
            } else if (to === '/databases') {
                const data = await getDatabases()
                setState(data);
            } else if (to === '/documents/new') {

            } else if (to === '/sport-result') {

            } else if (to.startsWith('/documents/')) {
                console.log(params, params['id'], params['id'] === 1);
                const data = await getDocument(params['id'])
                setState(data);
            }

            navigate(to);
        }
    );
};
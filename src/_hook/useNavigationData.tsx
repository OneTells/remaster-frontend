import {use} from "react";

import {NavigationContext} from "@/_context/navigation-context.tsx";


export const useNavigationData = () => {
    const [data] = use(NavigationContext);
    return data;
};
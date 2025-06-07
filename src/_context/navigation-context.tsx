'use client'

import React, {createContext, ReactNode, useState} from 'react'
import {getDocuments} from "@/app/documents/_api.tsx";
import {getDopingAthletes} from "@/app/doping-athletes/_api.tsx";
import {getDatabases} from "@/app/databases/_api.tsx";
import {getDocument} from "@/app/document/_api.tsx";


type StateType = (
    Awaited<ReturnType<(
        typeof getDocuments
        | typeof getDopingAthletes
        | typeof getDatabases
        | typeof getDocument
        )>> | null
    )

type NavigationContextType = [StateType, React.Dispatch<StateType>]

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
export const NavigationContext = createContext<NavigationContextType>(undefined);

export default function NavigationProvider({children}: { children: ReactNode }) {
    const [state, setState] = useState<StateType>(null);

    return (
        <NavigationContext.Provider value={[state, setState]}>
            {children}
        </NavigationContext.Provider>
    )
}

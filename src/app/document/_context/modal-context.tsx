'use client'

import React, {createContext, ReactNode, useReducer} from 'react'


type State = {
    isOpen: boolean;
    data: any | null;
};

type OpenAction = {
    type: 'OPEN';
    data: any | null;
};

type CloseAction = {
    type: 'CLOSE';
};


type Action = OpenAction | CloseAction;

type ModalContextType = [State, React.ActionDispatch<[action: Action]>]

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
export const ModalContext = createContext<ModalContextType>(undefined);

function reducer(state: State, action: Action) {
    if (action.type === 'OPEN') {
        return {isOpen: true, data: action.data}
    } else if (action.type === 'CLOSE') {
        return {isOpen: false, data: null}
    }

    return state
}

export default function ModalContextProvider({children}: { children: ReactNode }) {
    const [state, dispatch] = useReducer(reducer, {isOpen: false, data: null});

    return (
        <ModalContext.Provider value={[state, dispatch]}>
            {children}
        </ModalContext.Provider>
    )
}

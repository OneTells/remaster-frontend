'use client'

import React, {createContext, ReactNode, useReducer} from 'react'
import {AthleteType} from "@/app/document/_types.tsx";


type NullableFields<T, K extends keyof T> = {
    [P in K]: null | T[P];
};

export type DefaultAthleteType = (
    Omit<AthleteType, 'id' | 'sport_id' | 'is_sports_category_granted' | 'is_doping_check_passed'>
    & NullableFields<AthleteType, 'sport_id' | 'is_sports_category_granted' | 'is_doping_check_passed'>
    );

type State = {
    mode: 'EDIT';
    data: AthleteType;
} | {
    mode: 'CLOSE';
    data: null;
} | {
    mode: 'NEW';
    data: DefaultAthleteType;
};

type OpenAction = {
    type: 'OPEN';
    data: AthleteType;
};

type CloseAction = {
    type: 'CLOSE';
};

type NewAction = {
    type: 'NEW';
};

type Action = OpenAction | CloseAction | NewAction;

type ModalContextType = [State, React.ActionDispatch<[action: Action]>]

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
export const ModalContext = createContext<ModalContextType>(undefined);

function reducer(state: State, action: Action): State {
    if (action.type === 'OPEN') {
        return {mode: 'EDIT', data: action.data}
    } else if (action.type === 'CLOSE') {
        return {mode: 'CLOSE', data: null}
    } else if (action.type === 'NEW') {
        return {
            mode: 'NEW', data: {
                full_name: '',
                birth_date: new Date().toLocaleDateString('ru-RU'),
                sport_id: null,
                municipality: '',
                organization: '',
                is_sports_category_granted: null,
                is_doping_check_passed: null,
            }
        }
    }

    return state
}

export default function ModalContextProvider({children}: { children: ReactNode }) {
    const [state, dispatch] = useReducer(reducer, {mode: 'CLOSE', data: null});

    return (
        <ModalContext.Provider value={[state, dispatch]}>
            {children}
        </ModalContext.Provider>
    )
}

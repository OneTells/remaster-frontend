'use client'

import React, {createContext, ReactNode, useReducer} from 'react'

import {AthleteType, DopingCheckerType, ResultCheckerType} from "@/app/document/_types.tsx";


type NullableFields<T, K extends keyof T> = {
    [P in K]: null | T[P];
};

export type DefaultAthleteType = (
    Omit<AthleteType, 'id' | 'sport_id' | 'is_sports_category_granted' | 'is_doping_check_passed' | 'municipality_id' | 'organization_id'>
    & NullableFields<AthleteType, 'sport_id' | 'is_sports_category_granted' | 'is_doping_check_passed' | 'municipality_id' | 'organization_id'>
    );

type State = {
    mode: 'EDIT_MENU';
    athlete: AthleteType | DefaultAthleteType;
} | {
    mode: 'CHECK_DOPING_MENU';
    athlete: AthleteType | DefaultAthleteType
} | {
    mode: 'CHECK_RESULT_MENU';
    athlete: AthleteType | DefaultAthleteType
} | {
    mode: 'CLOSE';
};

type Action = {
    mode: 'OPEN_MODAL';
    athlete: AthleteType;
} | {
    mode: 'CREATE_NEW_ATHLETE';
} | {
    mode: 'OPEN_EDIT_MENU';
} | {
    mode: 'OPEN_CHECK_DOPING_MENU';
} | {
    mode: 'OPEN_CHECK_RESULT_MENU';
} | {
    mode: 'CLOSE';
} | {
    mode: 'UPDATE_DATA_IN_DOPING_MENU';
    dopingCheckerData: Partial<DopingCheckerType>;
} | {
    mode: 'UPDATE_ATHLETE_DATA';
    athlete: Partial<AthleteType>;
} | {
    mode: 'UPDATE_DATA_IN_RESULT_MENU';
    resultCheckerData: Partial<ResultCheckerType>;
};

type ModalContextType = [State, React.ActionDispatch<[action: Action]>]

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
export const ModalContext = createContext<ModalContextType>(undefined);

function reducer(state: State, action: Action): State {
    if (action.mode === 'OPEN_MODAL') {
        return {
            mode: 'EDIT_MENU',
            athlete: action.athlete,
        }
    } else if (action.mode === 'CREATE_NEW_ATHLETE') {
        return {
            mode: 'EDIT_MENU',
            athlete: {
                full_name: '',
                birth_date: '',
                sport_id: null,
                municipality_id: null,
                organization_id: null,
                is_sports_category_granted: null,
                is_doping_check_passed: null,
                doping_data: {full_name: '', selectId: null},
                result_data: {
                    moduleTabs: [{
                        module: null,
                        initData: null,
                        state: {},
                        isDopingCheckPassed: null
                    }],
                    activeTab: 0
                }
            }
        }
    } else if (action.mode === 'OPEN_EDIT_MENU') {
        if (state.mode === 'CLOSE')
            throw new Error('Unexpected mode: ' + state.mode);

        return {
            mode: 'EDIT_MENU',
            athlete: state.athlete
        }
    } else if (action.mode === 'OPEN_CHECK_DOPING_MENU') {
        if (state.mode !== 'EDIT_MENU')
            throw new Error('Unexpected mode: ' + state.mode);

        return {
            mode: 'CHECK_DOPING_MENU',
            athlete: state.athlete
        }
    } else if (action.mode === 'OPEN_CHECK_RESULT_MENU') {
        if (state.mode !== 'EDIT_MENU')
            throw new Error('Unexpected mode: ' + state.mode);

        return {
            mode: 'CHECK_RESULT_MENU',
            athlete: state.athlete
        }
    } else if (action.mode === 'CLOSE') {
        return action
    } else if (action.mode === 'UPDATE_DATA_IN_DOPING_MENU') {
        if (state.mode !== 'CHECK_DOPING_MENU')
            throw new Error('Unexpected mode: ' + state.mode);

        return {
            mode: state.mode,
            athlete: {...state.athlete, doping_data: {...state.athlete.doping_data, ...action.dopingCheckerData}},
        }
    } else if (action.mode === 'UPDATE_ATHLETE_DATA') {
        if (state.mode === 'CLOSE')
            throw new Error('Unexpected mode: ' + state.mode);

        return {
            mode: state.mode,
            athlete: {...state.athlete, ...action.athlete}
        }
    } else if (action.mode === 'UPDATE_DATA_IN_RESULT_MENU') {
        if (state.mode !== 'CHECK_RESULT_MENU')
            throw new Error('Unexpected mode: ' + state.mode);

        return {
            mode: state.mode,
            athlete: {...state.athlete, result_data: {...state.athlete.result_data, ...action.resultCheckerData}},
        }
    }

    return state
}

export default function ModalContextProvider({children}: { children: ReactNode }) {
    const [state, dispatch] = useReducer(reducer, {mode: 'CLOSE'});

    return (
        <ModalContext.Provider value={[state, dispatch]}>
            {children}
        </ModalContext.Provider>
    )
}

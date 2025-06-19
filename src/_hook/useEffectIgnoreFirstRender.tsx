import {useEffect, useRef} from 'react';


function deepEqual(a: any, b: any): boolean {
    if (a === b) return true;

    if (typeof a !== 'object' || a === null || typeof b !== 'object' || b === null) return false;

    if (a instanceof Date && b instanceof Date) return a.getTime() === b.getTime();

    if (Array.isArray(a) && Array.isArray(b)) {
        if (a.length !== b.length) return false;
        return a.every((val, i) => deepEqual(val, b[i]));
    }

    const aKeys = Object.keys(a);
    const bKeys = Object.keys(b);
    if (aKeys.length !== bKeys.length) return false;

    return aKeys.every(key => deepEqual(a[key], b[key]));
}

export function useEffectIgnoreFirstRender(
    effect: () => void | (() => void),
    deps: any[]
) {
    const isFirstRender = useRef(true);
    const prevDeps = useRef<any[]>(deps);
    const cleanupFn = useRef<(() => void) | null>(null);

    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false;
            prevDeps.current = deps;
            return;
        }

        const hasChanged = !prevDeps.current ||
            deps.length !== prevDeps.current.length ||
            deps.some((dep, i) => !deepEqual(dep, prevDeps.current[i]));

        if (!hasChanged) return

        if (cleanupFn.current) {
            cleanupFn.current();
        }

        prevDeps.current = deps;
        cleanupFn.current = effect() || null;
    }, deps);

    useEffect(() => {
        return () => {
            if (cleanupFn.current) {
                cleanupFn.current();
                cleanupFn.current = null;
            }
        };
    }, []);
}

'use client'

import styles from "./TitleBar.module.css";

import {getCurrentWindow, Window} from '@tauri-apps/api/window';
import {MouseEventHandler, useEffect, useRef, useState} from "react";
import {invoke} from "@tauri-apps/api/core";

import {WindowMinimizeIcon} from "@/_assets/window_minimize_icon";
import {WindowMaximizeIcon} from "@/_assets/window_maximize_icon";
import {WindowCloseIcon} from "@/_assets/window_close_icon";
import {useNavigation} from "@/_hook/useNavigation.tsx";


export function TitleBar() {
    const [appWindow, setAppWindow] = useState<Window | undefined>(undefined)
    const ref = useRef<HTMLDivElement | null>(null)

    const navigate = useNavigation();

    useEffect(() => {
        // const listener = (event: MouseEvent) => event.preventDefault()
        //
        // document.addEventListener('contextmenu', listener);
        // return () => document.removeEventListener('contextmenu', listener)
    }, [])

    useEffect(() => {
        const window = getCurrentWindow()
        setAppWindow(window);

        (async () => {
            await new Promise(resolve => setTimeout(resolve, 100));
            await navigate("/documents")
            await invoke("show_window", {window})
        })()
    }, [])

    const onMouseDown: MouseEventHandler = (event) => {
        if (ref.current !== event.target)
            return

        if (event.buttons !== 1)
            return;

        if (event.detail === 1)
            appWindow?.startDragging();
        else
            appWindow?.toggleMaximize()
    }

    return (
        <div className={styles["container"]} onMouseDown={onMouseDown} ref={ref}>
            <div className={styles["button"]} onClick={async () => await appWindow?.minimize()}>
                <WindowMinimizeIcon/>
            </div>
            <div className={styles["button"]} onClick={async () => await appWindow?.toggleMaximize()}>
                <WindowMaximizeIcon/>
            </div>
            <div className={styles["button"]} onClick={async () => await appWindow?.close()}>
                <WindowCloseIcon/>
            </div>
        </div>
    )
}
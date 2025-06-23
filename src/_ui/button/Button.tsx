import styles from "./Button.module.css"

import React, {MouseEventHandler} from "react";


type Props = {
    children: React.ReactNode,
    style?: React.CSSProperties,
    onClick?: MouseEventHandler<any> | undefined,
    onDoubleClick?: MouseEventHandler<any> | undefined,
    className?: string,
    disabled?: boolean
}

export function Button(props: Props) {
    return (
        <button
            className={`${styles["button"]} ${props.className || ''} ${props.disabled ? styles.disabled : ''}`}
            style={props.style}
            onClick={props.onClick}
            onDoubleClick={props.onDoubleClick}
            disabled={props.disabled}
        >
            {props.children}
        </button>
    )
}
import styles from "./Button.module.css"

import React, {MouseEventHandler} from "react";


type Props = {
    children: React.ReactNode,
    style?: React.CSSProperties,
    onClick?: MouseEventHandler<any> | undefined,
    onDoubleClick?: MouseEventHandler<any> | undefined,
    className?: string
}

export function Button(props: Props) {
    return (
        <button
            className={styles["button"] + (props.className ? ` ${props.className}` : "")}
            {...(props.style ? {style: props.style} : {})}
            {...(props.onClick ? {onClick: props.onClick} : {})}
            {...(props.onDoubleClick ? {onDoubleClick: props.onDoubleClick} : {})}
        >
            {props.children}
        </button>
    )
}
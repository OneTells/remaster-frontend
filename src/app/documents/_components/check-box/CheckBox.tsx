import styles from "./CheckBox.module.css";

import {ChangeEvent, RefObject} from "react";


type Props = {
    checked: boolean,
    onChange: (event: ChangeEvent<HTMLInputElement>) => void,
    ref: RefObject<HTMLDivElement | null>
}

export function CheckBox(props: Props) {
    return (
        <div className={styles["checkbox-wrapper"]} ref={props.ref}>
            <input type="checkbox" checked={props.checked} onChange={props.onChange}/>
            <div className={styles["custom-checkbox"]}/>
        </div>
    );
}

import styles from "./CheckBox.module.css";

import {ChangeEvent} from "react";


type Props = {
    checked: boolean,
    onChange: (event: ChangeEvent<HTMLInputElement>) => void,
}

export function CheckBox(props: Props) {
    return (
        <div className={styles["checkbox-wrapper"]}>
            <input type="checkbox" checked={props.checked} onChange={props.onChange}/>
            <div className={styles["custom-checkbox"]}/>
        </div>
    );
}

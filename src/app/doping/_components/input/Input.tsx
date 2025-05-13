// import styles from "./Input.moule.css";

import {ChangeEvent} from "react";


type Props = {
    onChange: (event: ChangeEvent<HTMLInputElement>) => void,
    placeholder: string,
    type: string,
    value: string
}

export function Input(props: Props) {
    return (
        <div >
            <input type={props.type} value={props.value} onChange={props.onChange}/>
            <div />
        </div>
    );
}
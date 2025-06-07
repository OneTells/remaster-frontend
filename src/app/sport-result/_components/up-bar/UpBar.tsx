import styles from "./UpBar.module.css";

// import React, { useState } from "react";


// type Props = {
// }

export function UpBar() {
    return (
        <div className={styles["container"]}>
            <div>
                <p>Вид спорта</p>
                <input
                    type="text" 
                />
            </div>
        </div>
    );
}

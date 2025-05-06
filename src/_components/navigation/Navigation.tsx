import styles from "@/_components/navigation/Navigation.module.css";

import {DocumentIcon} from "@/_assets/document_icon";
import {DopingIcon} from "@/_assets/doping_icon";
import {SportResultIcon} from "@/_assets/sport_result_icon";
import {SettingsIcon} from "@/_assets/settings_icon";
import {useNavigate} from "react-router";


export function Navigation() {
    const navigate = useNavigate();

    return (
        <nav className={styles["container"]}>
            <div className={styles['button']} onClick={() => navigate("/")}>
                <DocumentIcon/>
            </div>
            <div className={styles['button']}>
                <DopingIcon/>
            </div>
            <div className={styles['button']}>
                <SportResultIcon/>
            </div>
            <div className={`${styles['button']} ${styles['settings']}`}>
                <SettingsIcon/>
            </div>
        </nav>
    )
}
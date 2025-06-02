import styles from "@/_components/navigation/Navigation.module.css";

import {DocumentIcon} from "@/_assets/document_icon";
import {DopingIcon} from "@/_assets/doping_icon";
import {SportResultIcon} from "@/_assets/sport_result_icon";
import {SettingsIcon} from "@/_assets/settings_icon";
import {useNavigate} from "react-router";
import {Tooltip} from "@/_ui/tooltip/Tooltip.tsx";


export function Navigation() {
    const navigate = useNavigate();

    return (
        <nav className={styles["container"]}>
            <Tooltip text={'Документы'} position={'right'}>
                <div className={styles['button']} onClick={() => navigate("/")}>
                    <DocumentIcon/>
                </div>
            </Tooltip>
            <Tooltip text={'Проверка на допинг'} position={'right'} width={75}>
                <div className={styles['button']} onClick={() => navigate("/doping-athletes")}>
                    <DopingIcon/>
                </div>
            </Tooltip>
            <Tooltip text={'Проверка на результат'} position={'right'} width={75}>
                <div className={styles['button']} onClick={() => navigate("/sport-result")}>
                    <SportResultIcon/>
                </div>
            </Tooltip>
            <div className={`${styles['settings']}`}>
                <Tooltip text={'Базы данных'} position={'right'}>
                    <div className={`${styles['button']}`} onClick={() => navigate("/settings")}>
                        <SettingsIcon/>
                    </div>
                </Tooltip>
            </div>
        </nav>
    )
}
import styles from "@/_components/navigation/Navigation.module.css";

import {DocumentIcon} from "@/_assets/document_icon";
import {DopingIcon} from "@/_assets/doping_icon";
import {SportResultIcon} from "@/_assets/sport_result_icon";
import {DatabasesIcon} from "@/_assets/databases_icon.tsx";
import {Tooltip} from "@/_ui/tooltip/Tooltip.tsx";
import {useNavigation} from "@/_hook/useNavigation.tsx";


export function Navigation() {
    const navigate = useNavigation();

    return (
        <nav className={styles["container"]}>
            <Tooltip text={'Документы'} position={'right'}>
                <div className={styles['button']} onClick={() => navigate("/documents")}>
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
                    <div className={`${styles['button']}`} onClick={() => navigate("/databases")}>
                        <DatabasesIcon/>
                    </div>
                </Tooltip>
            </div>
        </nav>
    )
}
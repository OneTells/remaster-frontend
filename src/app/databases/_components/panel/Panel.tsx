import styles from "./Panel.module.css";

import {UploadIcon} from "@/_assets/upload_icon";
import {DownloadIcon} from "@/_assets/download_icon";
import {Button} from "@/_ui/button/Button";
import {Tooltip} from "@/_ui/tooltip/Tooltip.tsx";


type PanelProps = {
    title: string;
    date: string;
    upload: () => void;
    download: () => void;
};

export function Panel({title, date, upload, download}: PanelProps) {
    return (
        <div className={styles.container}>
            <div className={styles.leftSection}>
                <div className={styles.title}>
                    {title}
                </div>
                <div className={styles.date}>
                    {date}
                </div>
            </div>
            <div className={styles.buttons}>
                <Tooltip text={'Загрузить файл'} position={'bottom'}>
                    <Button className={styles.button} onClick={upload}>
                        <UploadIcon/>
                    </Button>
                </Tooltip>
                <Tooltip text={'Скачать файл'} position={'bottom'}>
                    <Button className={styles.button} onClick={download}>
                        <DownloadIcon/>
                    </Button>
                </Tooltip>
            </div>
        </div>
    );
}
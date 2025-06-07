import styles from "./ActionBar.module.css";

import {Dispatch, SetStateAction} from "react";

import {Button} from "@/_ui/button/Button.tsx";
import {DownloadIcon} from "@/_assets/download_icon.tsx";
import {DocumentIcon} from "@/_assets/document_icon.tsx";
import {Tooltip} from "@/_ui/tooltip/Tooltip.tsx";
import {Select} from "@/_ui/select/Select.tsx";
import {UploadIcon} from "@/_assets/upload_icon.tsx";
import {RemoveIcon} from "@/_assets/remove_icon.tsx";


type Props = {
    name: string | undefined,
    setName: Dispatch<SetStateAction<string| undefined>>,
    sportsRankId: number | null,
    setSportsRankId: Dispatch<SetStateAction<number | null>>,
}

export function ActionBar(props: Props) {
    const options = [
        {id: 1, label: '1 спортивный'},
        {id: 2, label: 'КМС'},
    ];

    return (
        <div>
            <div className={styles["document-title-container"]}>
                <p className={styles["title"]}>Название документа:</p>
                <input
                    className={styles["input"]}
                    value={props.name}
                    onChange={(e) => props.setName(e.currentTarget.value)}
                    type="text"
                />
                <div className={styles['container']}>
                    <Tooltip text={'Выгрузить документ в файл'} position={'left'}>
                        <Button style={{height: '44px', width: '44px', padding: '10px'}}>
                            <DownloadIcon/>
                        </Button>
                    </Tooltip>
                    <Tooltip text={'Сформировать приказ'} position={'bottom'} align={'start'}>
                        <Button style={{height: '44px', width: '44px', padding: '10px'}}>
                            <DocumentIcon/>
                        </Button>
                    </Tooltip>
                </div>
            </div>
            <div className={styles["document-title-container"]}>
                <p className={styles["title"]}>Спортивный разряд:</p>
                <Select options={options} selectedOptionId={props.sportsRankId} setSelectedOptionId={props.setSportsRankId}/>
                <div style={{display: 'flex', justifyContent: 'flex-end', flex: 1, gap: '5px'}}>
                    <Button style={{height: '44px', padding: '10px 20px'}}>
                        Новый участник
                    </Button>
                    <Tooltip text={'Добавить участников из файла'}>
                        <Button style={{height: '44px', width: '44px', padding: '10px'}}>
                            <UploadIcon/>
                        </Button>
                    </Tooltip>
                    <Tooltip text={'Выгрузить участников в файл'}>
                        <Button style={{height: '44px', width: '44px', padding: '10px'}}>
                            <DownloadIcon/>
                        </Button>
                    </Tooltip>
                    <Tooltip text={'Удалить участников'} align={'start'}>
                        <Button style={{height: '44px', width: '44px', padding: '10px'}}>
                            <RemoveIcon/>
                        </Button>
                    </Tooltip>
                </div>
            </div>
        </div>
    );
}
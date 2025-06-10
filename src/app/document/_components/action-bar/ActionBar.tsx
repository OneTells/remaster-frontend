import styles from "./ActionBar.module.css";

import {Button} from "@/_ui/button/Button.tsx";
import {DownloadIcon} from "@/_assets/download_icon.tsx";
import {DocumentIcon} from "@/_assets/document_icon.tsx";
import {Tooltip} from "@/_ui/tooltip/Tooltip.tsx";
import {Select} from "@/_ui/select/Select.tsx";
import {UploadIcon} from "@/_assets/upload_icon.tsx";
import {RemoveIcon} from "@/_assets/remove_icon.tsx";
import {ActionBarDocumentType} from "@/app/document/_types.tsx";


type Props = {
    document: ActionBarDocumentType;

    titleChange: (value: string) => void;
    sportsCategoryIdChange: (id: number) => void;

    downloadDocument?: () => void;
    createOrder?: () => void;
    createAthlete?: () => void;
    uploadAthletes?: () => void;
    downloadAthletes?: () => void;
    removeAthletes?: () => void;
    createOrderOnClick?: () => void;
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
                    value={props.document.title}
                    onChange={(e) => props.titleChange(e.target.value)}
                    type="text"
                />
                <div className={styles['container']}>
                    <Tooltip text={'Выгрузить документ в файл'} position={'left'}>
                        <Button style={{height: '44px', width: '44px', padding: '10px'}} onClick={props.downloadDocument}>
                            <DownloadIcon/>
                        </Button>
                    </Tooltip>
                    <Tooltip text={'Сформировать приказ'} position={'bottom'} align={'start'}>
                        <Button style={{height: '44px', width: '44px', padding: '10px'}} onClick={props.createOrderOnClick}>
                            <DocumentIcon/>
                        </Button>
                    </Tooltip>
                </div>
            </div>
            <div className={styles["document-title-container"]}>
                <p className={styles["title"]}>Спортивный разряд:</p>
                <Select
                    options={options}
                    selectedOptionId={props.document.sports_category_id}
                    setSelectedOptionId={props.sportsCategoryIdChange}
                />
                <div style={{display: 'flex', justifyContent: 'flex-end', flex: 1, gap: '5px'}}>
                    <Button style={{height: '44px', padding: '10px 20px'}} onClick={props.createAthlete}>
                        Новый участник
                    </Button>
                    <Tooltip text={'Добавить участников из файла'}>
                        <Button style={{height: '44px', width: '44px', padding: '10px'}} onClick={props.uploadAthletes}>
                            <UploadIcon/>
                        </Button>
                    </Tooltip>
                    <Tooltip text={'Выгрузить участников в файл'}>
                        <Button style={{height: '44px', width: '44px', padding: '10px'}} onClick={props.downloadAthletes}>
                            <DownloadIcon/>
                        </Button>
                    </Tooltip>
                    <Tooltip text={'Удалить участников'} align={'start'}>
                        <Button style={{height: '44px', width: '44px', padding: '10px'}} onClick={props.removeAthletes}>
                            <RemoveIcon/>
                        </Button>
                    </Tooltip>
                </div>
            </div>
        </div>
    );
}
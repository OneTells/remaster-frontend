import styles from "./ActionBar.module.css";

import {Dispatch, SetStateAction} from "react";
import {useNavigate} from "react-router";

import {UploadIcon} from "@/_assets/upload_icon";
import {RemoveIcon} from "@/_assets/remove_icon";
import {deleteDocument} from "@/app/documents/_api.tsx";
import {Button} from "@/_ui/button/Button.tsx";
import {Tooltip} from "@/_ui/tooltip/Tooltip.tsx";


type Props = {
    selectIDs: Set<number>,
    setSelectIDs: Dispatch<SetStateAction<Set<number>>>
    setNeedUpdate: Dispatch<SetStateAction<boolean>>
}

export function ActionBar(props: Props) {
    const navigate = useNavigate();

    const createDocument = async () => {
        navigate(`/documents/new`);
    }

    const uploadDocument = async () => {
        // TODO Получение пути файла и передача его на backend

        props.setSelectIDs(new Set());
        props.setNeedUpdate(true);
    }

    const removeDocument = async () => {
        await deleteDocument(props.selectIDs);
        props.setSelectIDs(new Set());
        props.setNeedUpdate(true);
    }

    return (
        <div className={styles["container"]}>
            <Button style={{height: '44px', padding: '10px 20px'}} onClick={createDocument}>
                Новый документ
            </Button>
            <Tooltip text={'Загрузить из файла'} position={'bottom'} width={70}>
                <Button style={{height: '44px', width: '44px', padding: '10px'}} onClick={uploadDocument}>
                    <UploadIcon/>
                </Button>
            </Tooltip>
            <Tooltip text={'Удалить документы'} position={'bottom'} width={70} align={'start'}>
                <Button style={{height: '44px', width: '44px', padding: '10px'}} onClick={removeDocument}>
                    <RemoveIcon/>
                </Button>
            </Tooltip>
        </div>
    )
}
import styles from "./ActionBar.module.css";

import {Dispatch, SetStateAction} from "react";
import {open} from "@tauri-apps/plugin-dialog";

import {UploadIcon} from "@/_assets/upload_icon";
import {RemoveIcon} from "@/_assets/remove_icon";
import {createDocumentFromFile, deleteDocuments} from "@/app/documents/_api.tsx";
import {Button} from "@/_ui/button/Button.tsx";
import {Tooltip} from "@/_ui/tooltip/Tooltip.tsx";
import {useNavigation} from "@/_hook/useNavigation.tsx";


type Props = {
    selectIDs: Set<number>;
    setSelectIDs: Dispatch<SetStateAction<Set<number>>>;
    update: () => Promise<void>;
}

export function ActionBar(props: Props) {
    const navigate = useNavigation();

    const createDocument = async () => {
        await navigate(`/documents/new`);
    }

    const uploadDocument = async () => {
        const path = await open(
            {
                title: 'Открытие файла',
                multiple: false,
                directory: false,
                filters: [{name: 'Remaster документ', extensions: ['rmd']}]
            }
        );

        if (!path) {
            return;
        }

        await createDocumentFromFile(path);

        await props.update();
    }

    const removeDocument = async () => {
        await deleteDocuments(props.selectIDs);
        props.setSelectIDs(new Set());

        await props.update();
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
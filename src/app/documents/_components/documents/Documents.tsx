import styles from './Documents.module.css';

import {Dispatch, SetStateAction, useState} from 'react';

import {DocumentType} from '@/app/documents/_types';
import {Document} from '@/app/documents/_components/document/Document';
import {Pagination} from '@/_ui/pagination/Pagination';
import {useEffectIgnoreFirstRender} from "@/_hook/useEffectIgnoreFirstRender.tsx";


const itemsPerPage = 18

type Props = {
    documents: DocumentType[];
    selectIDs: Set<number>;
    setSelectIDs: Dispatch<SetStateAction<Set<number>>>;
};

export function Documents({documents, selectIDs, setSelectIDs}: Props) {
    const [currentPage, setCurrentPage] = useState(1);

    useEffectIgnoreFirstRender(() => {
        setCurrentPage(1);
    }, [documents]);

    const getDisplayItems = (): DocumentType[] => {
        return documents.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
    };

    return (
        <div className={styles.container}>
            <div className={styles.documentContainer}>
                {getDisplayItems().map((document) => (
                    <Document
                        key={document.id}
                        document={document}
                        selectIDs={selectIDs}
                        setSelectIDs={setSelectIDs}
                    />
                ))}
            </div>
            <Pagination
                currentPage={currentPage}
                maxPages={Math.max(1, Math.ceil(documents.length / itemsPerPage))}
                onPageChange={setCurrentPage}
            />
        </div>
    );
}
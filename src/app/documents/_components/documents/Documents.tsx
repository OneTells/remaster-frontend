import styles from './Documents.module.css';


import {Dispatch, SetStateAction, useEffect, useState} from 'react';

import {DocumentType} from '@/app/documents/_types';
import {Document} from '@/app/documents/_components/document/Document';
import {Pagination} from '@/_ui/pagination/Pagination';


type Props = {
    documents: DocumentType[];
    selectIDs: Set<number>;
    setSelectIDs: Dispatch<SetStateAction<Set<number>>>;
};

export function Documents({documents, selectIDs, setSelectIDs}: Props) {
    const itemsPerPage = 18

    const [currentPage, setCurrentPage] = useState(1);
    const [currentItems, setCurrentItems] = useState<DocumentType[]>(
        documents.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
    );

    useEffect(() => {
        setCurrentPage(1);
    }, [documents]);

    useEffect(() => {
        setCurrentItems(documents.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage));
    }, [currentPage, documents]);

    return (
        <div className={styles.container}>
            <div className={styles.documentContainer}>
                {currentItems.map((document) => (
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
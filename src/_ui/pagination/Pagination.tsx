import styles from './Pagination.module.css';

import {Dispatch, SetStateAction} from "react";


type Props = {
    currentPage: number;
    maxPages: number;
    onPageChange: Dispatch<SetStateAction<number>>;
};

export function Pagination({currentPage, maxPages, onPageChange}: Props) {
    const getPageNumbers = () => {
        if (maxPages < 8) {
            return Array.from({length: maxPages}, (_, i) => i + 1);
        }

        const pages: (number | '...')[] = [];

        pages.push(1);

        if (currentPage >= 5) {
            pages.push('...');
        } else {
            pages.push(2);
        }

        pages.push(Math.min(Math.max(currentPage - 1, 3), maxPages - 4));
        pages.push(Math.min(Math.max(currentPage - 1, 3) + 1, maxPages - 3));
        pages.push(Math.min(Math.max(currentPage - 1, 3) + 2, maxPages - 2));

        if (maxPages - currentPage >= 4) {
            pages.push('...');
        } else {
            pages.push(maxPages - 1);
        }

        pages.push(maxPages);

        return pages;
    };

    return (
        <div className={styles.pagination}>
            <button
                className={styles.button}
                onClick={() => onPageChange(1)}
                disabled={currentPage === 1}
            >
                «
            </button>
            <button
                className={styles.button}
                onClick={() => onPageChange(page => page - 1)}
                disabled={currentPage === 1}
            >
                ‹
            </button>
            {getPageNumbers().map((page, index) => {
                if (page === '...') {
                    return (
                        <span key={index} className={styles.ellipsis}>
                            ...
                        </span>
                    );
                }

                return (
                    <button
                        key={index}
                        className={`${styles.button} ${currentPage === page ? styles.active : ''}`}
                        onClick={() => onPageChange(page)}
                    >
                        {page}
                    </button>
                );
            })}
            <button
                className={styles.button}
                onClick={() => onPageChange(page => page + 1)}
                disabled={currentPage === maxPages}
            >
                ›
            </button>
            <button
                className={styles.button}
                onClick={() => onPageChange(maxPages)}
                disabled={currentPage === maxPages}
            >
                »
            </button>
        </div>
    );
}

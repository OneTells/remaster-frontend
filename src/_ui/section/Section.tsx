import styles from './Section.module.css';

import React, {ReactNode} from 'react';


type SectionProps = {
    title: string;
    children: ReactNode;
    className?: string;
    style?: React.CSSProperties;
};

export const Section = ({title, children, className = '', style = {}}: SectionProps) => {
    return (
        <fieldset className={`${styles.section} ${className}`} style={style}>
            <legend className={styles.legend}>{title}</legend>
            {children}
        </fieldset>
    );
};
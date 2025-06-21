import styles from './InlineGroup.module.css';

import React, {ReactNode} from 'react';


type InlineGroupProps = {
    children: ReactNode;
    gap?: string;
    align?: 'flex-start' | 'center' | 'flex-end' | 'stretch';
    className?: string;
    style?: React.CSSProperties;
};

export const InlineGroup = ({children, gap = '10px', align = 'center', className = '', style = {}}: InlineGroupProps) => {
    return (
        <div className={`${styles.inlineGroup} ${className}`} style={{gap: gap, alignItems: align, ...style}}>
            {children}
        </div>
    );
};
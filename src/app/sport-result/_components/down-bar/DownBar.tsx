import styles from "./DownBar.module.css";


type Props = {
    isDopingCheckPassed: boolean | null
}

export const DownBar = ({isDopingCheckPassed}: Props) => {
    return (
        <div className={styles['field']}>
            <p>Присвоить разряд:</p>
            <p style={{color: isDopingCheckPassed === null ? '#e8ff00' : isDopingCheckPassed ? '#4CAF50' : '#f44336'}}>
                {isDopingCheckPassed === null ? 'Нет данных' : isDopingCheckPassed ? 'Да' : 'Нет'}
            </p>
        </div>
    )
};
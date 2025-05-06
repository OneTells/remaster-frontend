import styles from "./CheckBox.module.css";

export function CheckBox(props: { checked: boolean, onChange: () => void }) {
    return (
        <div className={styles["checkbox-wrapper"]}>
            <input type="checkbox" {...props}/>
            <div className={styles["custom-checkbox"]}/>
        </div>
    );
}

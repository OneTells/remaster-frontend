import styles from "./ActionBar.module.css";

import {Dispatch, SetStateAction} from "react";
import {SportType} from "@/app/document/_types.tsx";
import {Select} from "@/_ui/select/Select.tsx";
import {getSportData} from "@/app/sport-result/_api.tsx";


type Props = {
    data: {
        sportCategoryId: number | null,
        sportId: number | null,
        sportData: Awaited<ReturnType<typeof getSportData>> | null
    };
    setData: Dispatch<SetStateAction<{
        sportCategoryId: number | null,
        sportId: number | null,
        sportData: Awaited<ReturnType<typeof getSportData>> | null
    }>>;

    isDopingCheckPassed: boolean | null

    sports: SportType[];
}

export const ActionBar = (props: Props) => {
    const selectSport = async (sportId: number) => {
        const sportData = await getSportData(sportId);
        props.setData(prev => ({...prev, sportId: sportId, sportData: sportData}));
    }

    return (
        <div className={styles['container']}>
            <div className={styles['field']}>
                <p className={styles['title']}>Вид спорта</p>
                <Select
                    style={{width: '280px', height: '100%'}}
                    options={props.sports.map(({name, ...rest}) => ({...rest, label: name}))}
                    selectedOptionId={props.data.sportId}
                    setSelectedOptionId={selectSport}
                />
            </div>
            <div className={styles['field']}>
                <p className={styles['title']}>Спортивный разряд</p>
                <Select
                    options={[
                        {id: 2, label: '1 спортивный'},
                        {id: 1, label: 'КМС'},
                    ]}
                    selectedOptionId={props.data.sportCategoryId}
                    setSelectedOptionId={(id) => props.setData(prev => ({...prev, sportCategoryId: id}))}
                    style={{ width: '200px', height: '100%'}}
                />
            </div>
        </div>
    )
}
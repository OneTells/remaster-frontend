import {useEffect, useState} from "react";

import {getSportData} from "@/app/sport-result/_api.tsx";
import {Select} from "@/_ui/select/Select.tsx";
import {DateInput} from "@/_ui/date-input/DateInput.tsx";
import {NumberInput} from "@/_ui/number-input/NumberInput.tsx";


type Props = {
    data: {
        sportCategoryId: number | null,
        sportId: number | null,
        sportData: Awaited<ReturnType<typeof getSportData>> | null
    };
    setIsDopingCheckPassed: (data: any) => Promise<void>;
}

export function SportsProgramming(props: Props) {
    const [data, setData] = useState<{
        competitionStatusId: number | null;
        birthDate: string;
        place: number | undefined
    }>({
        competitionStatusId: null,
        birthDate: '',
        place: 0
    });

    useEffect(() => {
        if (data.competitionStatusId === null || data.birthDate === '' || data.place === 0)
            return

        (async () => {
            await props.setIsDopingCheckPassed({
                'sports_category_id': props.data.sportCategoryId,
                'competition_status_id': data.competitionStatusId,
                'birth_date': new Date(data.birthDate).toISOString(),
                'place': data.place
            })
        })()
    }, [data]);

    return (
        <>
            <fieldset style={{borderRadius: '10px'}}>
                <legend>Информация об атлете</legend>
                <div style={{display: 'flex', flexDirection: 'row', gap: '10px'}}>
                    <p style={{width: '165px'}}>Дата рождения</p>
                    <DateInput
                        data={data.birthDate}
                        setData={(date) => setData(prev => ({...prev, birthDate: date}))}
                        style={{width: '100px'}}
                    />
                </div>
            </fieldset>
            <fieldset style={{marginTop: '20px', borderRadius: '10px'}}>
                <legend>Информация о соревнованиях</legend>
                <div style={{display: 'flex', flexDirection: 'row', gap: '10px'}}>
                    <p style={{width: '165px'}}>Статус соревнований</p>
                    <Select
                        options={props.data.sportData!.competition_statuses.map(({name, ...rest}) => ({...rest, label: name}))}
                        selectedOptionId={data.competitionStatusId}
                        setSelectedOptionId={(id) => setData(prev => ({...prev, competitionStatusId: id}))}
                        style={{width: '500px'}}
                    />
                </div>
            </fieldset>
            <fieldset style={{marginTop: '20px', borderRadius: '10px'}}>
                <legend>Информация о результате</legend>
                <div style={{display: 'flex', flexDirection: 'row', gap: '10px'}}>
                    <p style={{width: '165px'}}>Занятое место</p>
                    <NumberInput
                        data={data.place}
                        setData={(place) => setData(prev => ({...prev, place: Number(place)}))}
                        style={{width: '100px'}}
                    />
                </div>
            </fieldset>
        </>
    );
}

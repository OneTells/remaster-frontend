import {useState} from "react";

import {Select} from "@/_ui/select/Select.tsx";
import {DateInput} from "@/_ui/date-input/DateInput.tsx";
import {NumberInput} from "@/_ui/number-input/NumberInput.tsx";
import {SportsProgrammingDataType} from "@/app/sport-result/_types.tsx";
import {Section} from "@/_ui/section/Section.tsx";
import {InlineGroup} from "@/_ui/inline-group/InlineGroup.tsx";
import {useEffectIgnoreFirstRender} from "@/_hook/useEffectIgnoreFirstRender.tsx";
import {ModuleType} from "@/app/document/_types.tsx";


type Props = {
    data: {
        sportCategoryId: number,
        module: ModuleType,
        moduleData: SportsProgrammingDataType
    };
    sendDataForCheck: (data: any | null) => Promise<void>;
}

export function SportsProgramming(props: Props) {
    const [data, setData] = useState<{
        birthDate: string;
        competitionStatusId: number | null;
        disciplineId: number | null;
        place: number | undefined
    }>({
        birthDate: '',
        competitionStatusId: null,
        disciplineId: null,
        place: 0
    });

    useEffectIgnoreFirstRender(() => {
        (async () => {
            if (data.competitionStatusId === null || data.birthDate === '' || data.place === 0) {
                await props.sendDataForCheck(null)
                return
            }

            await props.sendDataForCheck({
                'sports_category_id': props.data.sportCategoryId,
                'competition_status_id': data.competitionStatusId,
                'discipline_id': data.disciplineId,
                'birth_date': new Date(data.birthDate).toISOString(),
                'place': data.place
            })
        })()
    }, [data]);

    return (
        <>
            <Section title="Информация об атлете">
                <InlineGroup>
                    <p style={{width: '150px'}}>Дата рождения</p>
                    <DateInput
                        data={data.birthDate}
                        setData={(date) => setData(prev => ({...prev, birthDate: date}))}
                        style={{width: '100px'}}
                    />
                </InlineGroup>
            </Section>
            <Section title="Информация о соревнованиях" style={{marginTop: '20px'}}>
                <InlineGroup>
                    <p style={{width: '200px'}}>Статус соревнований</p>
                    <Select
                        options={props.data.moduleData.competition_statuses.map(({name, ...rest}) => ({...rest, label: name}))}
                        selectedOptionId={data.competitionStatusId}
                        setSelectedOptionId={(id) => setData(prev => ({...prev, competitionStatusId: id}))}
                        style={{width: '400px'}}
                    />
                </InlineGroup>
                <InlineGroup style={{marginTop: '10px'}}>
                    <p style={{width: '200px'}}>Спортивная дисциплина</p>
                    <Select
                        options={props.data.moduleData.disciplines.map(({name, ...rest}) => ({...rest, label: name}))}
                        selectedOptionId={data.disciplineId}
                        setSelectedOptionId={(id) => setData(prev => ({...prev, disciplineId: id}))}
                        style={{width: '400px'}}
                    />
                </InlineGroup>
            </Section>
            <Section title="Информация о результате" style={{marginTop: '20px'}}>
                <InlineGroup>
                    <p style={{width: '150px'}}>Занятое место</p>
                    <NumberInput
                        data={data.place}
                        setData={(place) => setData(prev => ({...prev, place: Number(place)}))}
                        style={{width: '100px'}}
                    />
                </InlineGroup>
            </Section>
        </>
    );
}

import {Select} from "@/_ui/select/Select.tsx";
import {DateInput} from "@/_ui/date-input/DateInput.tsx";
import {NumberInput} from "@/_ui/number-input/NumberInput.tsx";
import {SportResultDataType, SportsProgrammingDataType} from "@/app/sport-result/_types.tsx";
import {Section} from "@/_ui/section/Section.tsx";
import {InlineGroup} from "@/_ui/inline-group/InlineGroup.tsx";
import {useEffectIgnoreFirstRender} from "@/_hook/useEffectIgnoreFirstRender.tsx";


type DataType = {
    birthDate: string;

    competitionStatusId: number;
    disciplineId: number;

    place: number;
}

type Props = {
    data: { [K in keyof SportResultDataType]: NonNullable<SportResultDataType[K]> };
    initData: SportsProgrammingDataType

    state: Partial<DataType>
    updateState: (state: Partial<DataType>) => void;

    sendDataForCheck: (data: any | null) => Promise<void>;
}

export function SportsProgramming({data, initData, state, updateState, sendDataForCheck}: Props) {
    useEffectIgnoreFirstRender(() => {
        (async () => {
            if (
                (state.birthDate || '') === ''
                || state.competitionStatusId === undefined
                || state.disciplineId === undefined
                || (state.place || 0) === 0
            ) {
                await sendDataForCheck(null)
                return
            }

            await sendDataForCheck({
                'sports_category_id': data.sportCategoryId,
                'competition_status_id': state.competitionStatusId,
                'discipline_id': state.disciplineId,
                'birth_date': new Date(state.birthDate!).toISOString(),
                'place': state.place!
            })
        })()
    }, [state, data.sportCategoryId]);

    return (
        <>
            <Section title="Информация об атлете">
                <InlineGroup>
                    <p style={{width: '150px'}}>Дата рождения</p>
                    <DateInput
                        data={state.birthDate || ''}
                        setData={(date) => updateState({birthDate: date})}
                        style={{width: '100px'}}
                    />
                </InlineGroup>
            </Section>
            <Section title="Информация о соревнованиях" style={{marginTop: '20px'}}>
                <InlineGroup>
                    <p style={{width: '200px'}}>Статус соревнований</p>
                    <Select
                        options={initData.competition_statuses.map(({name, ...rest}) => ({...rest, label: name}))}
                        selectedOptionId={state.competitionStatusId || null}
                        setSelectedOptionId={(id) => updateState({competitionStatusId: id})}
                        style={{width: '400px'}}
                    />
                </InlineGroup>
                <InlineGroup style={{marginTop: '10px'}}>
                    <p style={{width: '200px'}}>Спортивная дисциплина</p>
                    <Select
                        options={initData.disciplines.map(({name, ...rest}) => ({...rest, label: name}))}
                        selectedOptionId={state.disciplineId || null}
                        setSelectedOptionId={(id) => updateState({disciplineId: id})}
                        style={{width: '400px'}}
                    />
                </InlineGroup>
            </Section>
            <Section title="Информация о результате" style={{marginTop: '20px'}}>
                <InlineGroup>
                    <p style={{width: '150px'}}>Занятое место</p>
                    <NumberInput
                        data={state.place || 0}
                        setData={(place) => updateState({place: Number(place)})}
                        style={{width: '100px'}}
                    />
                </InlineGroup>
            </Section>
        </>
    );
}

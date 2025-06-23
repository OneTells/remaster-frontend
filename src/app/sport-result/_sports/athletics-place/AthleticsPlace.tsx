import {InlineGroup} from "@/_ui/inline-group/InlineGroup.tsx";
import {AthleticsPlaceType, SportResultDataType} from "@/app/sport-result/_types.tsx";
import {Section} from "@/_ui/section/Section.tsx";
import {DateInput} from "@/_ui/date-input/DateInput.tsx";
import {Select} from "@/_ui/select/Select.tsx";
import {NumberInput} from "@/_ui/number-input/NumberInput.tsx";
import {useEffectIgnoreFirstRender} from "@/_hook/useEffectIgnoreFirstRender.tsx";
import {CheckBox} from "@/app/document/_components/check-box/CheckBox.tsx";
import {getAdditionalConditionsData} from "@/app/sport-result/_sports/athletics-place/_api.tsx";
import {AdditionalConditionsType} from "@/app/sport-result/_sports/athletics-place/_types.tsx";


type DataType = {
    birthDate: string;

    competitionStatusId: number;
    disciplineId: number;

    place: number;

    firstCondition: boolean;
    secondCondition: boolean;

    additional_conditions: AdditionalConditionsType;
}

type Props = {
    data: { [K in keyof SportResultDataType]: NonNullable<SportResultDataType[K]> };
    initData: AthleticsPlaceType

    state: Partial<DataType>
    updateState: (state: Partial<DataType>) => void;

    sendDataForCheck: (data: any | null) => Promise<void>;
}

export function AthleticsPlace({data, initData, state, updateState, sendDataForCheck}: Props) {
    useEffectIgnoreFirstRender(() => {
        const timer = setTimeout(() => {
            (async () => {
                if (
                    (state.birthDate || '') === ''
                    || state.competitionStatusId === undefined
                    || state.disciplineId === undefined
                    || (state.place || 0) === 0
                ) {
                    updateState({firstCondition: undefined, secondCondition: undefined})
                    return
                }

                const additionalConditions = await getAdditionalConditionsData(
                    data.module.id,
                    {
                        'sports_category_id': data.sportCategoryId,
                        'birth_date': new Date(state.birthDate!).toISOString(),
                        'competition_status_id': state.competitionStatusId,
                        'discipline_id': state.disciplineId,
                        'place': state.place!
                    }
                )

                if (state.firstCondition === undefined && additionalConditions.additional_conditions.length !== 0)
                    updateState({firstCondition: false, additional_conditions: additionalConditions})
                else if (state.firstCondition !== undefined && !(additionalConditions.additional_conditions.length !== 0))
                    updateState({firstCondition: undefined, additional_conditions: undefined})

                if (
                    state.secondCondition === undefined
                    && initData.disciplines_with_minimum_number_of_participants.includes(state.disciplineId)
                    && data.sportCategoryId === 1
                )
                    updateState({secondCondition: false})
                else if (
                    state.secondCondition !== undefined
                    && !(
                        initData.disciplines_with_minimum_number_of_participants.includes(state.disciplineId)
                        && data.sportCategoryId === 1
                    )
                )
                    updateState({secondCondition: undefined})

            })();
        }, 300);

        return () => clearTimeout(timer);
    }, [data, data.sportCategoryId]);

    useEffectIgnoreFirstRender(() => {
        const timer = setTimeout(() => {
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

                    'birth_date': new Date(state.birthDate!).toISOString(),

                    'competition_status_id': state.competitionStatusId,
                    'discipline_id': state.disciplineId,

                    'place': state.place!,

                    'first_condition': state.firstCondition,
                    'second_condition': state.secondCondition
                })
            })();
        }, 300);

        return () => clearTimeout(timer);
    }, [data, data.sportCategoryId]);

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
                        setSelectedOptionId={(id) => updateState({competitionStatusId: id})} style={{width: '400px'}}
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
            {
                (state.firstCondition !== undefined || state.secondCondition !== undefined)
                && (
                    <Section title="Дополнительные условия" style={{marginTop: '20px'}}>
                        {state.firstCondition !== undefined && (
                            <InlineGroup style={{marginLeft: '10px'}}>
                                <CheckBox
                                    checked={state.firstCondition}
                                    onChange={() => updateState({firstCondition: !state.firstCondition})}
                                />
                                <p style={{width: '100%'}}>{
                                    state.additional_conditions!.additional_conditions.map(
                                        ({subject_from, min_participants}, index) => {
                                            let text: string[] = []

                                            if (min_participants !== null)
                                                text.push(`Количество участников (не менее ${min_participants}).`)

                                            if (subject_from !== null) {
                                                text.push(
                                                    'Количество субъектов Российской Федерации, которые ' +
                                                    `представляют спортсмены в виде программы, не менее ${subject_from}.`
                                                )
                                            }

                                            return (
                                                <>
                                                    {index !== 0 && <><br/><br/>ИЛИ<br/><br/></>}
                                                    <span key={index}>
                                                        {state.additional_conditions!.additional_conditions.length === 1 ? '' : `${index + 1}.`}
                                                        {text.join(' ')}
                                                    </span>
                                                </>
                                            )
                                        })
                                }</p>
                            </InlineGroup>
                        )}
                        {state.secondCondition !== undefined && (
                            <InlineGroup style={{marginLeft: '10px'}}>
                                <CheckBox
                                    checked={state.secondCondition}
                                    onChange={() => updateState({secondCondition: !state.secondCondition})}
                                />
                                <p style={{width: '100%'}}>
                                    Не менее пяти участников, имеющих не ниже КМС
                                </p>
                            </InlineGroup>
                        )}
                    </Section>
                )
            }
        </>
    );
}

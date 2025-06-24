import {DateInput} from "@/_ui/date-input/DateInput.tsx";
import {Select} from "@/_ui/select/Select.tsx";
import {NumberInput} from "@/_ui/number-input/NumberInput.tsx";
import {CheckBox} from "@/app/document/_components/check-box/CheckBox.tsx";
import {ComputerSportsType, ModuleProps} from "@/app/sport-result/_types.tsx";
import {Section} from "@/_ui/section/Section";
import {InlineGroup} from "@/_ui/inline-group/InlineGroup";
import {getAdditionalConditionsData} from "@/app/sport-result/_sports/computer-sports/_api.tsx";
import {AdditionalConditionsType} from "@/app/sport-result/_sports/computer-sports/_types.tsx";
import {useEffectIgnoreFirstRender} from "@/_hook/useEffectIgnoreFirstRender.tsx";


type DataType = {
    birthDate: string;

    competitionStatusId: number;
    disciplineId: number;

    place: number;

    firstCondition: boolean;
    secondCondition: boolean;
    thirdCondition: boolean;

    additional_conditions: AdditionalConditionsType;
}

type Props = ModuleProps<DataType, ComputerSportsType>

export function ComputerSports({module, sportCategoryId, initData, state, updateState, sendDataForCheck}: Props) {
    useEffectIgnoreFirstRender(() => {
        const timer = setTimeout(() => {
            (async () => {
                if (
                    (state.birthDate || '') === ''
                    || state.competitionStatusId === undefined
                    || state.disciplineId === undefined
                    || (state.place || 0) === 0
                ) {
                    updateState({firstCondition: undefined, secondCondition: undefined, thirdCondition: undefined})
                    return
                }

                const additionalConditions = await getAdditionalConditionsData(
                    module.id,
                    {
                        'sports_category_id': sportCategoryId,
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
                    && initData.disciplines_with_mandatory_participation.includes(state.disciplineId)
                )
                    updateState({secondCondition: false})
                else if (
                    state.secondCondition !== undefined
                    && !initData.disciplines_with_mandatory_participation.includes(state.disciplineId)
                )
                    updateState({secondCondition: undefined})

                if (state.thirdCondition === undefined && (state.place || 0) >= 9 && sportCategoryId === 2)
                    updateState({thirdCondition: false});
                else if (state.thirdCondition !== undefined && !((state.place || 0) >= 9 && sportCategoryId === 2))
                    updateState({thirdCondition: undefined})
            })();
        }, 300);

        return () => clearTimeout(timer);
    }, [state, sportCategoryId]);

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
                    'sports_category_id': sportCategoryId,

                    'birth_date': new Date(state.birthDate!).toISOString(),

                    'competition_status_id': state.competitionStatusId,
                    'discipline_id': state.disciplineId,

                    'place': state.place!,

                    'first_condition': state.firstCondition,
                    'second_condition': state.secondCondition,
                    'third_condition': state.thirdCondition
                })
            })();
        }, 300);

        return () => clearTimeout(timer);
    }, [state, sportCategoryId]);

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
                    <p style={{width: '190px'}}>Статус соревнований</p>
                    <Select
                        options={initData.competition_statuses.map(({name, ...rest}) => ({...rest, label: name}))}
                        selectedOptionId={state.competitionStatusId || null}
                        setSelectedOptionId={(id) => updateState({competitionStatusId: id})}
                        style={{width: '400px'}}
                    />
                </InlineGroup>
                <InlineGroup style={{marginTop: '10px'}}>
                    <p style={{width: '190px'}}>Спортивная дисциплина</p>
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
                (
                    state.firstCondition !== undefined
                    || state.secondCondition !== undefined
                    || state.thirdCondition !== undefined
                ) && (
                    <Section title="Дополнительные условия" style={{marginTop: '20px'}}>
                        {state.firstCondition !== undefined && (
                            <InlineGroup style={{marginLeft: '10px'}}>
                                <CheckBox
                                    checked={state.firstCondition}
                                    onChange={() => updateState({firstCondition: !state.firstCondition})}
                                />
                                <p style={{width: '100%'}}>{
                                    state.additional_conditions!.additional_conditions.map(({subject, min_won_matches}, index) => {
                                        let text: string[] = []

                                        if (min_won_matches !== null)
                                            text.push(`Количество выигранных матчей (не менее ${min_won_matches}).`)

                                        if (subject !== null) {
                                            text.push(
                                                state.additional_conditions!.is_internally_subject
                                                    ? 'Количество субъектов Российской Федерации, которые представляют спортсмены в виде программы, '
                                                    : 'Количество стран, которые представляют спортсмены в виде программы, '
                                            )

                                            if (subject.subject_to === null)
                                                text[text.length - 1] += `не менее ${subject.subject_from}.`
                                            else
                                                text[text.length - 1] += `${subject.subject_from}-${subject.subject_to}.`
                                        }

                                        return (<>
                                            {index !== 0 && <><br/><br/>ИЛИ<br/><br/></>}
                                            <span key={index}>
                                                {state.additional_conditions!.additional_conditions.length === 1 ? '' : `${index + 1}.`}
                                                {text.join(' ')}
                                            </span>
                                        </>)
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
                                    В составе команды необходимо участвовать не менее, чем в 100% матчей,
                                    проведенных командой, в соответствующем спортивном соревновании.
                                </p>
                            </InlineGroup>
                        )}
                        {state.thirdCondition !== undefined && (
                            <InlineGroup style={{marginLeft: '10px'}}>
                                <CheckBox
                                    checked={state.thirdCondition}
                                    onChange={() => updateState({thirdCondition: !state.thirdCondition})}
                                />
                                <p style={{width: '100%'}}>
                                    Требование за 9 место и ниже, если за такие места в спортивном соревновании
                                    предусмотрены спортивные разряды, выполняется при участии в соответствующем
                                    виде программы не менее 64 спортсменов.
                                </p>
                            </InlineGroup>
                        )}
                    </Section>
                )

            }
        </>
    );
}

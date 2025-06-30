import {AthleticsResultType, DisciplineContentType, DisciplineType, ModuleProps} from "@/app/sport-result/_types.tsx";
import {Section} from "@/_ui/section/Section.tsx";
import {InlineGroup} from "@/_ui/inline-group/InlineGroup.tsx";
import {Select} from "@/_ui/select/Select.tsx";
import {DateInput} from "@/_ui/date-input/DateInput.tsx";
import {NumberInput} from "@/_ui/number-input/NumberInput.tsx";
import {CheckBox} from "@/app/document/_components/check-box/CheckBox.tsx";
import {useEffectIgnoreFirstRender} from "@/_hook/useEffectIgnoreFirstRender.tsx";
import {
    getAdditionalConditionsData,
    getAdditionalConditionsDisciplineData
} from "@/app/sport-result/_sports/athletics-result/_api.tsx";
// import {Section} from "@/_ui/section/Section.tsx";
// import {InlineGroup} from "@/_ui/inline-group/InlineGroup.tsx";
// import {DateInput} from "@/_ui/date-input/DateInput.tsx";
// import {Select} from "@/_ui/select/Select.tsx";
// import {NumberInput} from "@/_ui/number-input/NumberInput.tsx";
// import {CheckBox} from "@/app/document/_components/check-box/CheckBox.tsx";


type DataType = {
    sexId: number;
    birthDate: string;

    disciplineId: number;
    disciplineContentId: number;

    result: {
        si: 'meter';
        kilometers: number;
        meters: string;
    } | {
        si: 'second';
        hours: number;
        minutes: number;
        seconds: string;
    }

    firstCondition: boolean;

    disciplineContents: DisciplineContentType[];
    disciplines: DisciplineType[];
}

type Props = ModuleProps<DataType, AthleticsResultType>

export function AthleticsResult({module, sportCategoryId, initData, state, updateState, sendDataForCheck}: Props) {
    useEffectIgnoreFirstRender(() => {
        const timer = setTimeout(() => {
            (async () => {
                if (state.sexId === undefined) {
                    return
                }

                const disciplines = await getAdditionalConditionsDisciplineData(module.id, {'sex_id': state.sexId})
                updateState({disciplines: disciplines})
            })();
        }, 300);

        return () => clearTimeout(timer);
    }, [state.sexId]);

    useEffectIgnoreFirstRender(() => {
        const timer = setTimeout(() => {
            (async () => {
                if (state.disciplineId === undefined) {
                    return
                }

                const data = await getAdditionalConditionsData(
                    module.id, {'discipline_id': state.disciplineId, 'sport_category_id': sportCategoryId}
                )
                updateState(
                    {
                        disciplineContents: data.contents,
                        result: data.system_count === 'meter' ? {
                            si: 'meter',
                            kilometers: 0,
                            meters: ''
                        } : {
                            si: 'second',
                            hours: 0,
                            minutes: 0,
                            seconds: ''
                        }
                    }
                )
            })();
        }, 300);

        return () => clearTimeout(timer);
    }, [state.disciplineId, sportCategoryId]);

    useEffectIgnoreFirstRender(() => {
        const timer = setTimeout(() => {
            (async () => {
                if (
                    (state.birthDate || '') === ''
                    || (state.disciplineContentId === undefined && state.disciplineContents !== undefined)
                    || (state.disciplineId === undefined)
                    || (
                        state.result!.si === 'meter'
                            ? state.result!.kilometers * 1000 + Number(state.result!.meters)
                            : state.result!.hours * 3600 + state.result!.minutes * 60 + Number(state.result!.seconds)
                    ) === 0
                    || state.firstCondition === undefined
                ) {
                    await sendDataForCheck(null)
                    return
                }

                await sendDataForCheck({
                    'sports_category_id': sportCategoryId,

                    'birth_date': new Date(state.birthDate!).toISOString(),

                    'discipline_id': state.disciplineId,
                    'content_id': state.disciplineContentId,

                    'result': (
                        state.result!.si === 'meter'
                            ? state.result!.kilometers * 1000 + Number(state.result!.meters)
                            : state.result!.hours * 3600 + state.result!.minutes * 60 + Number(state.result!.seconds)
                    ),

                    'first_condition': state.firstCondition,
                })
            })();
        }, 300);

        return () => clearTimeout(timer);
    }, [state, sportCategoryId]);

    return (
        <>
            <Section title="Информация об атлете">
                <InlineGroup>
                    <p style={{width: '150px'}}>Пол</p>
                    <Select
                        options={initData.map(({name, ...rest}) => ({...rest, label: name}))}
                        selectedOptionId={state.sexId || null}
                        setSelectedOptionId={(id) => updateState({sexId: id})}
                        style={{width: '150px'}}
                    />
                </InlineGroup>
                <InlineGroup>
                    <p style={{width: '150px'}}>Дата рождения</p>
                    <DateInput
                        data={state.birthDate || ''}
                        setData={(date) => updateState({birthDate: date})}
                        style={{width: '130px'}}
                    />
                </InlineGroup>
            </Section>
            <Section title="Информация о соревнованиях" style={{marginTop: '20px'}}>
                <InlineGroup style={{marginTop: '10px'}}>
                    <p style={{width: '190px'}}>Спортивная дисциплина</p>
                    <Select
                        options={state.disciplines?.map(({name, ...rest}) => ({...rest, label: name})) || []}
                        selectedOptionId={state.disciplineId || null}
                        setSelectedOptionId={(id) => updateState({disciplineId: id})}
                        style={{width: '400px'}}
                        disabled={state.disciplines === undefined}
                        searchable={true}
                    />
                </InlineGroup>
                <InlineGroup style={{marginTop: '10px'}}>
                    <p style={{width: '190px'}}>Содержание дисциплины</p>
                    <Select
                        options={state.disciplineContents?.map(({name, ...rest}) => ({...rest, label: name})) || []}
                        selectedOptionId={state.disciplineContentId || null}
                        setSelectedOptionId={(id) => updateState({disciplineContentId: id})}
                        style={{width: '400px'}}
                        disabled={state.disciplineContents === undefined}
                        searchable={true}
                    />
                </InlineGroup>
            </Section>
            <Section title="Информация о результате" style={{marginTop: '20px'}}>
                <InlineGroup>
                    <p style={{width: '150px'}}>Результат</p>
                    {
                        state.result?.si === 'meter' && (
                            <>
                                <div style={{width: '200px'}}>
                                    <NumberInput
                                        data={state.result?.kilometers || 0}
                                        setData={(kilometers) => updateState({
                                            // @ts-ignore
                                            result: {
                                                ...state.result,
                                                kilometers: Number(kilometers),
                                            }
                                        })}
                                        style={{width: '100px'}}
                                    />
                                    <span style={{marginLeft: '10px'}}>км.</span>
                                </div>
                                <div style={{width: '200px'}}>
                                    <NumberInput
                                        data={state.result?.meters || undefined}
                                        setData={(meters) => updateState({
                                            // @ts-ignore
                                            result: {
                                                ...state.result,
                                                meters: meters,
                                            }
                                        })}
                                        style={{width: '100px'}}
                                        allowDecimal={true}
                                    />
                                    <span style={{marginLeft: '10px'}}>м.</span>
                                </div>
                            </>
                        )
                    }
                    {
                        state.result?.si === 'second' && (
                            <>
                                <div style={{width: '200px'}}>
                                    <NumberInput
                                        data={state.result?.hours || 0}
                                        setData={(hours) => updateState({
                                            // @ts-ignore
                                            result: {
                                                ...state.result,
                                                hours: Number(hours),
                                            }
                                        })}
                                        style={{width: '100px'}}
                                    />
                                    <span style={{marginLeft: '10px'}}>ч.</span>
                                </div>
                                <div style={{width: '200px'}}>
                                    <NumberInput
                                        data={state.result?.minutes || 0}
                                        setData={(minutes) => updateState({
                                            // @ts-ignore
                                            result: {
                                                ...state.result,
                                                minutes: Number(minutes),
                                            }
                                        })}
                                        style={{width: '100px'}}
                                    />
                                    <span style={{marginLeft: '10px'}}>м.</span>
                                </div>
                                <div style={{width: '200px'}}>
                                    <NumberInput
                                        data={state.result?.seconds || undefined}
                                        setData={(seconds) => updateState({
                                            // @ts-ignore
                                            result: {
                                                ...state.result,
                                                seconds: seconds,
                                            }
                                        })}
                                        style={{width: '100px'}}
                                        allowDecimal={true}
                                    />
                                    <span style={{marginLeft: '10px'}}>с.</span>
                                </div>
                            </>
                        )
                    }
                </InlineGroup>
            </Section>
            <Section title="Дополнительные условия" style={{marginTop: '20px'}}>
                <InlineGroup style={{marginLeft: '10px'}}>
                    <CheckBox
                        checked={state.firstCondition || false}
                        onChange={() => updateState({firstCondition: !state.firstCondition})}
                    />
                    <p style={{width: '100%'}}>
                        Спортивное соревнование имеет статус, не ниже статуса других
                        официальных спортивных соревнований субъекта Российской Федерации.
                    </p>
                </InlineGroup>
            </Section>
        </>
    )
}

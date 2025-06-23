import {InlineGroup} from "@/_ui/inline-group/InlineGroup.tsx";
import {ModuleType} from "@/app/document/_types.tsx";
import {AthleticsPlaceType} from "@/app/sport-result/_types.tsx";
import {useState} from "react";

import {Section} from "@/_ui/section/Section.tsx";
import {DateInput} from "@/_ui/date-input/DateInput.tsx";
import {Select} from "@/_ui/select/Select.tsx";
import {NumberInput} from "@/_ui/number-input/NumberInput.tsx";
import {useEffectIgnoreFirstRender} from "@/_hook/useEffectIgnoreFirstRender.tsx";

import {CheckBox} from "@/app/document/_components/check-box/CheckBox.tsx";
import {getAdditionalConditionsData} from "@/app/sport-result/_sports/athletics-place/_api.tsx";
import {AdditionalConditionsType} from "@/app/sport-result/_sports/athletics-place/_types.tsx";


type Props = {
    data: {
        sportCategoryId: number;
        module: ModuleType;
        moduleData: AthleticsPlaceType;
    };
    sendDataForCheck: (data: any | null) => Promise<void>;
}

export function AthleticsPlace(props: Props) {
    const [data, setData] = useState<{
        birthDate: string;
        competitionStatusId: number | null;
        disciplineId: number | null;
        place: number;

        firstCondition: boolean | null;
        secondCondition: boolean | null;

        additional_conditions: AdditionalConditionsType | null;
    }>({
        birthDate: '',
        competitionStatusId: null,
        disciplineId: null,
        place: 0,

        firstCondition: null,
        secondCondition: null,

        additional_conditions: null
    });

    useEffectIgnoreFirstRender(() => {
        const timer = setTimeout(() => {
            (async () => {
                if (
                    data.birthDate === ''
                    || data.competitionStatusId === null
                    || data.disciplineId === null
                    || data.place === 0
                ) {
                    setData(prev => ({...prev, firstCondition: null, secondCondition: null}))
                    return
                }

                const additionalConditions = await getAdditionalConditionsData(props.data.module.id, {
                    'sports_category_id': props.data.sportCategoryId,
                    'birth_date': new Date(data.birthDate).toISOString(),
                    'competition_status_id': data.competitionStatusId,
                    'discipline_id': data.disciplineId,
                    'place': data.place
                })

                if (data.firstCondition === null && additionalConditions.additional_conditions.length !== 0)
                    setData(prev => ({
                        ...prev,
                        firstCondition: false,
                        additional_conditions: additionalConditions
                    }))
                else if (data.firstCondition !== null && !(additionalConditions.additional_conditions.length !== 0))
                    setData(prev => ({...prev, firstCondition: null, additional_condition: null}))

                if (
                    data.secondCondition === null
                    && props.data.moduleData.disciplines_with_minimum_number_of_participants.includes(data.disciplineId)
                    && props.data.sportCategoryId === 1
                )
                    setData(prev => ({...prev, secondCondition: false}))
                else if (
                    data.secondCondition !== null
                    && !(
                        props.data.moduleData.disciplines_with_minimum_number_of_participants.includes(data.disciplineId)
                        && props.data.sportCategoryId === 1
                    )
                )
                    setData(prev => ({...prev, secondCondition: null}))

            })();
        }, 300);

        return () => clearTimeout(timer);
    }, [data, props.data.sportCategoryId]);

    useEffectIgnoreFirstRender(() => {
        const timer = setTimeout(() => {
            (async () => {
                if (
                    data.birthDate === ''
                    || data.competitionStatusId === null
                    || data.disciplineId === null
                    || data.place === 0
                ) {
                    await props.sendDataForCheck(null)
                    return
                }

                await props.sendDataForCheck({
                    'sports_category_id': props.data.sportCategoryId,

                    'birth_date': new Date(data.birthDate).toISOString(),

                    'competition_status_id': data.competitionStatusId,
                    'discipline_id': data.disciplineId,

                    'place': data.place,

                    'first_condition': data.firstCondition,
                    'second_condition': data.secondCondition
                })
            })();
        }, 300);

        return () => clearTimeout(timer);
    }, [data, props.data.sportCategoryId]);

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
            {
                (
                    data.firstCondition !== null
                    || data.secondCondition !== null
                ) && (
                    <Section title="Дополнительные условия" style={{marginTop: '20px'}}>
                        {data.firstCondition !== null && (
                            <InlineGroup style={{marginLeft: '10px'}}>
                                <CheckBox
                                    checked={data.firstCondition}
                                    onChange={() => setData(prev => ({...prev, firstCondition: !prev.firstCondition}))}
                                />
                                <p style={{width: '100%'}}>{
                                    data.additional_conditions!.additional_conditions.map(({subject_from, min_participants}, index) => {
                                        let text: string[] = []

                                        if (min_participants !== null)
                                            text.push(`Количество участников (не менее ${min_participants}).`)

                                        if (subject_from !== null) {
                                            text.push(
                                                'Количество субъектов Российской Федерации, которые ' +
                                                `представляют спортсмены в виде программы, не менее ${subject_from}.`
                                            )
                                        }

                                        return (<>
                                            {index !== 0 && <><br/><br/>ИЛИ<br/><br/></>}
                                            <span key={index}>
                                                {data.additional_conditions!.additional_conditions.length === 1 ? '' : `${index + 1}.`}
                                                {text.join(' ')}
                                            </span>
                                        </>)
                                    })
                                }</p>
                            </InlineGroup>
                        )}
                        {data.secondCondition !== null && (
                            <InlineGroup style={{marginLeft: '10px'}}>
                                <CheckBox
                                    checked={data.secondCondition}
                                    onChange={() => setData(prev => ({...prev, secondCondition: !prev.secondCondition}))}
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

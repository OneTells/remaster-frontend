import {useState} from "react";

import {DateInput} from "@/_ui/date-input/DateInput.tsx";
import {Select} from "@/_ui/select/Select.tsx";
import {NumberInput} from "@/_ui/number-input/NumberInput.tsx";
import {CheckBox} from "@/app/document/_components/check-box/CheckBox.tsx";
import {ComputerSportsType} from "@/app/sport-result/_types.tsx";
import {Section} from "@/_ui/section/Section";
import {InlineGroup} from "@/_ui/inline-group/InlineGroup";
import {getAdditionalConditionsData} from "@/app/sport-result/_sports/computer-sports/_api.tsx";
import {AdditionalConditionsType} from "@/app/sport-result/_sports/computer-sports/_types.tsx";
import {useEffectIgnoreFirstRender} from "@/_hook/useEffectIgnoreFirstRender.tsx";


type Props = {
    data: {
        sportCategoryId: number;
        sportId: number;
        sportData: ComputerSportsType;
    };
    sendDataForCheck: (data: any | null) => Promise<void>;
}

export function ComputerSports(props: Props) {
    const [data, setData] = useState<{
        birthDate: string;
        competitionStatusId: number | null;
        disciplineId: number | null;
        place: number;

        firstCondition: boolean | null;
        secondCondition: boolean | null;
        thirdCondition: boolean | null;

        additional_conditions: AdditionalConditionsType | null;
    }>({
        birthDate: '',
        competitionStatusId: null,
        disciplineId: null,
        place: 0,

        firstCondition: null,
        secondCondition: null,
        thirdCondition: null,

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
                    setData(prev => ({...prev, firstCondition: null, secondCondition: null, thirdCondition: null}))
                    return
                }

                const additionalConditions = await getAdditionalConditionsData(props.data.sportId, {
                    'sports_category_id': props.data.sportCategoryId,
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
                    && props.data.sportData.disciplines_with_mandatory_participation.includes(data.disciplineId)
                )
                    setData(prev => ({...prev, secondCondition: false}))
                else if (
                    data.secondCondition !== null
                    && !props.data.sportData.disciplines_with_mandatory_participation.includes(data.disciplineId)
                )
                    setData(prev => ({...prev, secondCondition: null}))

                if (data.thirdCondition === null && data.place! >= 9 && props.data.sportCategoryId === 2)
                    setData(prev => ({...prev, thirdCondition: false}))
                else if (data.thirdCondition !== null && !(data.place! >= 9 && props.data.sportCategoryId === 2))
                    setData(prev => ({...prev, thirdCondition: null}))

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
                    'second_condition': data.secondCondition,
                    'third_condition': data.thirdCondition
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
                        options={props.data.sportData!.competition_statuses.map(({name, ...rest}) => ({...rest, label: name}))}
                        selectedOptionId={data.competitionStatusId}
                        setSelectedOptionId={(id) => setData(prev => ({...prev, competitionStatusId: id}))}
                        style={{width: '500px'}}
                    />
                </InlineGroup>
                <InlineGroup style={{marginTop: '10px'}}>
                    <p style={{width: '200px'}}>Спортивная дисциплина</p>
                    <Select
                        options={props.data.sportData!.disciplines.map(({name, ...rest}) => ({...rest, label: name}))}
                        selectedOptionId={data.disciplineId}
                        setSelectedOptionId={(id) => setData(prev => ({...prev, disciplineId: id}))}
                        style={{width: '500px'}}
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
                    || data.thirdCondition !== null
                ) && (
                    <Section title="Дополнительные условия" style={{marginTop: '20px'}}>
                        {data.firstCondition !== null && (
                            <InlineGroup style={{marginLeft: '10px'}}>
                                <CheckBox
                                    checked={data.firstCondition}
                                    onChange={() => setData(prev => ({...prev, firstCondition: !prev.firstCondition}))}
                                />
                                <p style={{width: '100%'}}>{
                                    data.additional_conditions!.additional_conditions.map(({subject, min_won_matches}, index) => {
                                        let text: string[] = []

                                        if (min_won_matches !== null)
                                            text.push(`Количество выигранных матчей (не менее ${min_won_matches}).`)

                                        if (subject !== null) {
                                            text.push(
                                                data.additional_conditions!.is_internally_subject
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
                                    В составе команды необходимо участвовать не менее, чем в 100% матчей,
                                    проведенных командой, в соответствующем спортивном соревновании.
                                </p>
                            </InlineGroup>
                        )}
                        {data.thirdCondition !== null && (
                            <InlineGroup style={{marginLeft: '10px'}}>
                                <CheckBox
                                    checked={data.thirdCondition}
                                    onChange={() => setData(prev => ({...prev, thirdCondition: !prev.thirdCondition}))}
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

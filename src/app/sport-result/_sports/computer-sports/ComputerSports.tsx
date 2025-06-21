import {useEffect, useState} from "react";

import {DateInput} from "@/_ui/date-input/DateInput.tsx";
import {Select} from "@/_ui/select/Select.tsx";
import {NumberInput} from "@/_ui/number-input/NumberInput.tsx";
import {CheckBox} from "@/app/document/_components/check-box/CheckBox.tsx";
import {ComputerSportsType} from "@/app/sport-result/_types.tsx";
import {Section} from "@/_ui/section/Section";
import {InlineGroup} from "@/_ui/inline-group/InlineGroup";
// import {SubjectsType} from "@/app/sport-result/_sports/computer-sports/_types.ts";


type Props = {
    data: {
        sportCategoryId: number;
        sportId: number;
        sportData: ComputerSportsType;
    };
    sendDataForCheck: (data: any | null) => Promise<void>;
}

export function ComputerSports(props: Props) {
    const k: Record<number, number> = {
        1: 3,
        2: 3
    };

    // const subjects: SubjectsType = {
    //     is_internally_subject: true,
    //     subjects: [
    //         {
    //             subject_from: 80,
    //             subject_to: null
    //         },
    //         {
    //             subject_from: 25,
    //             subject_to: 79
    //         }
    //     ]
    // };

    const [data, setData] = useState<{
        birthDate: string;
        competitionStatusId: number | null;
        disciplineId: number | null;
        place: number;
        firstCondition: boolean;
        secondCondition: boolean | null;
        thirdCondition: boolean | null;
        fourthCondition: boolean | null;
    }>({
        birthDate: '',
        competitionStatusId: null,
        disciplineId: null,
        place: 0,
        firstCondition: false,
        secondCondition: null,
        thirdCondition: null,
        fourthCondition: null,
    });

    useEffect(() => {
        (async () => {
            if (
                data.competitionStatusId === null
                || data.birthDate === ''
                || data.place === 0
                || data.disciplineId === null
                // || data.secondCondition === null
                // || data.thirdCondition === null
                // || data.fourthCondition === null
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
                'win_math': k[props.data.sportCategoryId],

                'first_condition': data.firstCondition,
                'second_condition': data.secondCondition,
                'third_condition': data.thirdCondition
            })
        })()
    }, [data]);

    useEffect(() => {
        if (
            data.competitionStatusId === null
            || data.birthDate === ''
            || data.place === 0
            || data.disciplineId === null
        )
            return

        (async () => {
            if (data.place! >= 9 && props.data.sportCategoryId === 2 && data.fourthCondition === null)
                setData(prev => ({...prev, fourthCondition: false}))

            if (data.secondCondition === null)
                setData(prev => ({...prev, secondCondition: false}))
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
                    <p style={{width: '165px'}}>Занятое место</p>
                    <NumberInput
                        data={data.place}
                        setData={(place) => setData(prev => ({...prev, place: Number(place)}))}
                        style={{width: '100px'}}
                    />
                </InlineGroup>
            </Section>
            <Section title="Дополнительные условия" style={{marginTop: '20px'}}>
                <InlineGroup style={{marginLeft: '10px'}}>
                    <CheckBox
                        checked={data.firstCondition}
                        onChange={() => setData(prev => ({...prev, firstCondition: !prev.firstCondition}))}
                    />
                    <p style={{width: '100%'}}>
                        Количество выигранных матчей (не менее {k[props.data.sportCategoryId]})
                    </p>
                </InlineGroup>
                {data.secondCondition !== null && (
                    <InlineGroup style={{marginLeft: '10px'}}>
                        <CheckBox
                            checked={data.secondCondition}
                            onChange={() => setData(prev => ({...prev, secondCondition: !prev.secondCondition}))}
                        />
                        <p style={{width: '100%'}}>
                            Количество стран, которые представляют спортсмены в виде программы, не менее 80
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
                            В составе команды необходимо участвовать не менее, чем в 100% матчей,
                            проведенных командой, в соответствующем спортивном соревновании
                        </p>
                    </InlineGroup>
                )}
                {data.fourthCondition !== null && (
                    <InlineGroup style={{marginLeft: '10px'}}>
                        <CheckBox
                            checked={data.fourthCondition}
                            onChange={() => setData(prev => ({...prev, fourthCondition: !prev.fourthCondition}))}
                        />
                        <p style={{width: '100%'}}>
                            Требование за 9 место и ниже, если за такие места в спортивном соревновании
                            предусмотрены спортивные разряды, выполняется при участии в соответствующем
                            виде программы не менее 64 спортсменов.
                        </p>
                    </InlineGroup>
                )}
            </Section>
        </>
    );
}

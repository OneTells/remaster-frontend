import {AthleticsResultType, SportResultDataType} from "@/app/sport-result/_types.tsx";


type DataType = {}

type Props = {
    data: { [K in keyof SportResultDataType]: NonNullable<SportResultDataType[K]> };
    initData: AthleticsResultType

    state: Partial<DataType>
    updateState: (state: Partial<DataType>) => void;

    sendDataForCheck: (data: any | null) => Promise<void>;
}

export function AthleticsResult(_props: Props) {
    return (<></>)
}

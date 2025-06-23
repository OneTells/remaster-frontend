import {ModuleType} from "@/app/document/_types.tsx";
import {AthleticsResultType} from "@/app/sport-result/_types.tsx";


type Props = {
    data: {
        sportCategoryId: number;
        module: ModuleType;
        moduleData: AthleticsResultType;
    };
    sendDataForCheck: (data: any | null) => Promise<void>;
}

export function AthleticsResult(_props: Props) {
    return (<></>)
}

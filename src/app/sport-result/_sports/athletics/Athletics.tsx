import {getSportData} from "@/app/sport-result/_api.tsx";
import {InlineGroup} from "@/_ui/inline-group/InlineGroup.tsx";


type Props = {
    data: {
        sportCategoryId: number | null,
        sportId: number | null,
        sportData: Awaited<ReturnType<typeof getSportData>> | null
    };
    sendDataForCheck: (data: any) => Promise<void>;
}

export function Athletics(_props: Props) {


    return (
        <>
            <InlineGroup>
                <p style={{width: '200px'}}>Спортивная дисциплина</p>

            </InlineGroup>
        </>
    );
}

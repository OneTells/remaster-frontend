import {getSportData} from "@/app/sport-result/_api.tsx";

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
        <p>Легкая атлетика</p>
    );
}

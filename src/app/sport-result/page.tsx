'use client'

import { DownBar } from "./_components/down-bar/DownBar"
import { Window } from "./_components/window/Window"
import { UpBar } from "./_components/up-bar/UpBar"
import {memo, use, useEffect, useState} from "react";

export function SportResultPage() {
    const [sportsRankId, setSportsRankId] = useState<number | null>(null);
    const [sportType, setsportType] = useState<number | null>(null);

    return(
        <>
            <UpBar
                sportType={sportType}
                setsportType={setsportType}
            />
            <Window 
                sportType={sportType}
                sportsRankId={sportsRankId}
            />
            <DownBar
                sportsRankId={sportsRankId}
                setSportsRankId={setSportsRankId}
            />
        </>
    )
}
import styles from "./Window.module.css";

import { SportsProgramming } from "../sports/SportsProgramming";
import { Swimming } from "../sports/Swimming";
import { Athletics } from "../sports/Athletics";


type Props = {
    sportType: number | null,
    sportsRankId: number | null
}

export function Window(props: Props) {
    return (
        <div>
            {props.sportType === 1 && <Athletics />}
            {props.sportType === 2 && <Swimming />}
            {props.sportType === 3 && <SportsProgramming />}
        </div>
    );
}

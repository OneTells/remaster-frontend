'use client'

import "./_styles.css";

import {Button} from "@/app/settings/_components/button/Button.tsx";


export default function Page() {
    return (
        <div className="dynamic-content-section-container1">
            <Button date={'26.05.2025'} title={'База по Русадо'}/>
            <Button date={'26.05.2025'} title={'Шаблон приказа'}/>
            <Button date={'26.05.2025'} title={'База по легкой атлетики'}/>
            <Button date={'26.05.2025'} title={'База по компьютерному спорту'}/>
            <Button date={'26.05.2025'} title={'База по баскетболу'}/>
            <Button date={'26.05.2025'} title={'База по волейболу'}/>
        </div>
    )
}


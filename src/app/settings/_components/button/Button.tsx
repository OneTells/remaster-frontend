import "./style.css";

import {UploadIcon} from "@/_assets/upload_icon.tsx";
import {DownloadIcon} from "@/_assets/download_icon.tsx";


type Props = {
    title: string,
    date: string
}

export function Button(props: Props) {
    return (
        <div className="dynamic-content-section-container">
            <div className="content-info-section">
                <p className="dynamic-title-section-style">{props.title}</p>
                <p className="date-or-title-info-style">{props.date}</p>
            </div>
            <div className="horizontal-flex-container">
                <div className="svg-container">
                    <DownloadIcon/>
                </div>
                <div className="svg-container1">
                    <UploadIcon/>
                </div>
            </div>
        </div>
    );
}

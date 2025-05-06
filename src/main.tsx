import "./globals.css";

import React, {Suspense} from "react";
import ReactDOM from "react-dom/client";
import {BrowserRouter, Route, Routes} from "react-router";

import {TitleBar} from "@/_components/title-bar/TitleBar.tsx";
import {Navigation} from "@/_components/navigation/Navigation.tsx";
import DocumentsPage from "@/app/documents/page.tsx";


ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <React.StrictMode>
        <TitleBar/>
        <div style={{display: 'flex'}}>
            <BrowserRouter>
                <Navigation/>
                <div className="content-container">
                    <Suspense>
                        <Routes>
                            <Route index path={'/'} element={<DocumentsPage/>}/>
                        </Routes>
                    </Suspense>
                </div>
            </BrowserRouter>
        </div>
    </React.StrictMode>,
);

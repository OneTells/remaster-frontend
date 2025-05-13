import "./globals.css";

import React, {Suspense} from "react";
import ReactDOM from "react-dom/client";
import {BrowserRouter, Route, Routes} from "react-router";

import {TitleBar} from "@/_components/title-bar/TitleBar.tsx";
import {Navigation} from "@/_components/navigation/Navigation.tsx";

import DocumentsPage from "@/app/documents/page.tsx";
import DocumentPage from "@/app/document/page.tsx";
import DopingAthletesPage from "@/app/doping-athletes/page.tsx";
import SportResultPage from "@/app/sport-result/page.tsx";
import SettingsPage from "@/app/settings/page.tsx";


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
                            <Route index path={'/documents/:id'} element={<DocumentPage/>}/>
                            <Route index path={'/doping-athletes'} element={<DopingAthletesPage/>}/>
                            <Route index path={'/sport-result'} element={<SportResultPage/>}/>
                            <Route index path={'/settings'} element={<SettingsPage/>}/>
                        </Routes>
                    </Suspense>
                </div>
            </BrowserRouter>
        </div>
    </React.StrictMode>,
);

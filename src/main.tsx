import "./globals.css";

import React from "react";
import ReactDOM from "react-dom/client";
import {BrowserRouter, Route, Routes} from "react-router";
import {ErrorBoundary} from "react-error-boundary";

import {TitleBar} from "@/_components/title-bar/TitleBar.tsx";
import {Navigation} from "@/_components/navigation/Navigation.tsx";

import {DocumentsPage} from "@/app/documents/page.tsx";
import {DocumentPage} from "@/app/document/page.tsx";
import {DopingAthletesPage} from "@/app/doping-athletes/page.tsx";
import {NewDocumentPage} from "@/app/new-document/page.tsx";
import SportResultPage from "@/app/sport-result/page.tsx";
import {DatabasesPage} from "@/app/databases/page.tsx";


ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <React.StrictMode>
        <BrowserRouter>
            <TitleBar/>
            <ErrorBoundary fallback={<></>}>
                <div style={{display: 'flex'}}>
                    <Navigation/>
                    <div className="content-container">
                        <Routes>
                            <Route index path={'/'} element={<></>}/>
                            <Route index path={'/documents'} element={<DocumentsPage/>}/>
                            <Route index path={'/documents/new'} element={<NewDocumentPage/>}/>
                            <Route index path={'/documents/:id'} element={<DocumentPage/>}/>
                            <Route index path={'/doping-athletes'} element={<DopingAthletesPage/>}/>
                            <Route index path={'/sport-result'} element={<SportResultPage/>}/>
                            <Route index path={'/databases'} element={<DatabasesPage/>}/>
                        </Routes>
                    </div>
                </div>
            </ErrorBoundary>
        </BrowserRouter>
    </React.StrictMode>
);

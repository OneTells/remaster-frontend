'use client';

import {memo} from "react";

import {Databases} from "@/app/databases/_components/databases/Databases.tsx";
import {useNavigationData} from "@/_hook/useNavigationData.tsx";
import {DatabasesType} from "@/app/databases/_types.tsx";


export const DatabasesPage = memo( function DatabasesPage() {
    const data = useNavigationData();
    return <Databases data={data as DatabasesType[]}/>
})

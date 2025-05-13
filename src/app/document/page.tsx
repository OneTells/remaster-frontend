'use client'

import {useParams} from "react-router";


export default function Page() {
    const {id} = useParams()

    return <div>{id}</div>
}


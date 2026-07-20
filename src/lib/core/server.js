import { headers } from "next/headers"
import { auth } from "../auth"
import { baseUrl } from "./baseUrl"

export const serverMutation = async(api,method, data)=>{
    const res = await fetch(`${baseUrl}${api}`, {
        method: method,
        headers:{
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })

    return res.json()
}

export const serverFetch = async(api,query)=>{
    const res = await fetch(`${baseUrl}${api}${query}`)
    return await res.json()
}

export const getUser = async()=>{
    const session = await auth.api.getSession({
        headers: await headers()
    })

    return session?.user
}
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
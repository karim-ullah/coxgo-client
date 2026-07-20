'use server'

import { serverFetch } from "@/lib/core/server"

export const getPrescriptions = async()=>{
    return serverFetch(`/api/get-prescriptions`)
}
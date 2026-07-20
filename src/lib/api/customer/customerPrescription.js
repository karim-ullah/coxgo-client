'use server'

import { serverFetch } from "@/lib/core/server"

export const getCustomerPrescriptions = async(userId)=>{
    return serverFetch(`/api/customer-prescriptions/${userId}`)
}
'use server'
import { serverMutation } from "../server"

export const createPrescription = async(data)=>{
    return serverMutation('/api/create-prescription', 'POST', data)
}

export const chatMessage = async(data)=>{
    return serverMutation(`/api/chat`, 'POST', data)
}
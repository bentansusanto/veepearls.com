'use client'
import { useQuery } from "@tanstack/react-query";
import { API_URL, getData } from "../ApiConfig";

export const JewelType = () => {
    return useQuery({
        queryKey: ['jewelType'],
        queryFn: async () => {
            const res = await getData(`${API_URL}/jeweltypes`)
            if(!res){
                throw new Error('Failed to fetch data')
            }
            return res.data
        }
    })
}
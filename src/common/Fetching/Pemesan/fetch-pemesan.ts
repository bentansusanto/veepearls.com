'use client'
import { useMutation, useQuery } from "@tanstack/react-query"
import Cookies from "js-cookie"
import { API_URL, getDataAuthorization, postDataWithAuth } from "../ApiConfig"
import { useFormik } from "formik"
import { pemesanValidationSchema, pemesanValues } from "@/common/validation/PemesanValidation"
import { useRouter } from "next/navigation"
export const CreatePemesan = () => {
    const token = Cookies.get("session_veepearl")
    const router = useRouter()
    const createMutation = useMutation({
        mutationFn: async(values: any) => postDataWithAuth(`${API_URL}/create_pemesan`, values, token),
        onSuccess(data:any) {
            console.log(data.message)
        },
        onError(error:any) {
            router.push("/login")
            console.log(error.message)
        }
    }) 

    const formik = useFormik({
        initialValues: pemesanValues,
        validationSchema: pemesanValidationSchema,
        onSubmit: async(values, { resetForm }) => {
            await createMutation.mutateAsync(values)
            resetForm()
        }
    })

    return{
        formik,   
    }
}

// get all pemesan
export const GetPemesan = () => {
    const token = Cookies.get("session_veepearl")
    const router = useRouter()
    return useQuery({
        queryKey: ["pemesan"],
        queryFn: async() => {
            if(!token) return router.push("/login")
            const res = await getDataAuthorization(`${API_URL}/find_all_pemesan`, token)
            return res.data
        }
    })
}

// get pemesan by id
export const GetPemesanById = (pemesanId: string) => {
    const token = Cookies.get("session_veepearl")
    const router = useRouter()
    return useQuery({
        queryKey: ["pemesanId", pemesanId],
        queryFn: async() => {
            if(!token) return router.push("/login")
            const res = await getDataAuthorization(`${API_URL}/find_pemesan/${pemesanId}`, token)
            return res.data
        }
    })
}
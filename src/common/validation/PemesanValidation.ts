import * as Yup from "yup"
export const pemesanValues = {
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    country: "",
    zip_code: "",
}


export const pemesanValidationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    phone: Yup.string().required("Phone is required"),
    address: Yup.string().required("Address is required"),
    city: Yup.string().required("City is required"),
    country: Yup.string().required("Country is required"),
    zip_code: Yup.string().required("Zip Code is required"),
})
'use client'
import { useCreatePemesanMutation } from "@/store/services/pemesan.service";
import { Button } from "@/components/ui/button";
import React from "react";
import { useFormik } from "formik";
import { pemesanValues, pemesanValidationSchema } from "@/common/validation/PemesanValidation";

const FormAddPemesan = () => {
  const [createPemesan, { isLoading }] = useCreatePemesanMutation();
  const formik = useFormik({
    initialValues: pemesanValues,
    validationSchema: pemesanValidationSchema,
    onSubmit: async (values) => {
      try {
        await createPemesan(values).unwrap();
        formik.resetForm();
      } catch (error) {
        console.error("Failed to create pemesan", error);
      }
    },
  });

  return (
    <div className="px-3 mt-5 h-64 overflow-y-scroll">
      <form onSubmit={formik.handleSubmit}>
        <div className="mb-4 space-y-2">
          <input
            type="text"
            {...formik.getFieldProps("name")}
            placeholder="Enter name"
            className="text-sm border border-gray-200 dark:border-gray-600
            p-3 w-full rounded-md outline-none"
          />
          {formik.touched.name && formik.errors.name && (
            <p className="text-red-500 text-xs">{String(formik.errors.name)}</p>
          )}
        </div>
        <div className="mb-4 flex items-start gap-3">
          <div className="w-full space-y-2">
            <input
              type="text"
              {...formik.getFieldProps("email")}
              placeholder="Enter email"
              className="text-sm border border-gray-200 dark:border-gray-600
              p-3 w-full rounded-md outline-none"
            />
            {formik.touched.email && formik.errors.email && (
              <p className="text-red-500 text-xs">{String(formik.errors.email)}</p>
            )}
          </div>
          <div className="w-full space-y-2">
            <input
              type="text"
              {...formik.getFieldProps("phone")}
              placeholder="Enter phone"
              className="text-sm border border-gray-200 dark:border-gray-600
              p-3 w-full rounded-md outline-none"
            />
            {formik.touched.phone && formik.errors.phone && (
              <p className="text-red-500 text-xs">{String(formik.errors.phone)}</p>
            )}
          </div>
        </div>
        <div className="mb-4 space-y-2">
          <textarea
            {...formik.getFieldProps("address")}
            placeholder="Enter address"
            className="text-sm border border-gray-200 dark:border-gray-600
            p-3 w-full rounded-md outline-none"
          />
          {formik.touched.address && formik.errors.address && (
            <p className="text-red-500 text-xs">{String(formik.errors.address)}</p>
          )}
        </div>
        <div className="mb-4 flex items-start gap-3">
          <div className="w-full space-y-2">
            <input
              type="text"
              {...formik.getFieldProps("city")}
              placeholder="Enter city"
              className="text-sm border border-gray-200 dark:border-gray-600
            p-3 w-full rounded-md outline-none"
            />
            {formik.touched.city && formik.errors.city && (
              <p className="text-red-500 text-xs">{String(formik.errors.city)}</p>
            )}
          </div>
          <div className="w-full space-y-2">
            <input
              type="text"
              {...formik.getFieldProps("country")}
              placeholder="Enter country"
              className="text-sm border border-gray-200 dark:border-gray-600
            p-3 w-full rounded-md outline-none"
            />
            {formik.touched.country && formik.errors.country && (
              <p className="text-red-500 text-xs">{String(formik.errors.country)}</p>
            )}
          </div>
        </div>
        <div className="mb-4 space-y-2">
          <input
            type="text"
            {...formik.getFieldProps("zip_code")}
            placeholder="Enter zip code"
            className="text-sm border border-gray-200 dark:border-gray-600
            p-3 w-full rounded-md outline-none"
          />
          {formik.touched.zip_code && formik.errors.zip_code && (
            <p className="text-red-500 text-xs">{String(formik.errors.zip_code)}</p>
          )}
        </div>
        <div className="mb-4">
          <Button className="w-full py-3" disabled={isLoading}>
            {isLoading ? "Loading..." : "Submit Form"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default FormAddPemesan;

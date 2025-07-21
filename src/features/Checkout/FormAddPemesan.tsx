'use client'
import { CreatePemesan } from "@/common/Fetching/Pemesan/fetch-pemesan";
import { Button } from "@/components/ui/button";
import React from "react";

const FormAddPemesan = () => {
  const { formik } = CreatePemesan();
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
            <p className="text-red-500 text-xs">{formik.errors.name}</p>
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
              <p className="text-red-500 text-xs">{formik.errors.email}</p>
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
              <p className="text-red-500 text-xs">{formik.errors.phone}</p>
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
            <p className="text-red-500 text-xs">{formik.errors.address}</p>
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
              <p className="text-red-500 text-xs">{formik.errors.city}</p>
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
              <p className="text-red-500 text-xs">{formik.errors.country}</p>
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
            <p className="text-red-500 text-xs">{formik.errors.zip_code}</p>
          )}
        </div>
        <div className="mb-4">
          <Button className="w-full py-3">
            {formik.isSubmitting ? "Loading..." : "Submit Form"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default FormAddPemesan;

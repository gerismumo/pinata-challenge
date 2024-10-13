"use client";

import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";
import axios from "axios";

type Props = {
  close: (value: boolean) => void;
};

const AddForm: React.FC<Props> = ({ close }) => {
  const initialValues = {
    file: null as File | null,
    heading: "",
    description: "",
    category: "public", 
  };

  const validationSchema = Yup.object({
    file: Yup.mixed()
      .required("File is required")
      .test("fileType", "Unsupported file format", (value) => {
        if (!value) return true;
        return (
          value instanceof File &&
          ["image/jpeg", "image/png", "video/mp4", "audio/mpeg"].includes(value.type)
        );
      })
      .test("fileSize", "File too large, must be less than 5MB", (value) => {
        if (!value) return true;
        return value instanceof File && value.size <= 5 * 1024 * 1024;
      }),
    heading: Yup.string().required("Heading is required"),
    description: Yup.string(),
    category: Yup.string().oneOf(["public", "private"], "Invalid category").required("Category is required"),
  });

  const handleSubmit = async (values: any, { setSubmitting }: any) => {
    const formData = new FormData();
    formData.append("file", values.file);
    formData.append("heading", values.heading);
    formData.append("description", values.description);
    formData.append("category", values.category); 

    console.log("Form data submitted:", values);

    try {
      const response = await axios.post("/api/upload", formData);
      if (response.data.success) {
        toast.success(response.data.message);
        close(false);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("Network Error");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="w-full p-4">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, setFieldValue }) => (
          <Form className="flex flex-col gap-[10px] bg-white shadow-md rounded px-[30px] py-[10px]">
            <div >
              <label htmlFor="file" className="block text-sm font-medium">
                File Upload
              </label>
              <input
                id="file"
                name="file"
                type="file"
                accept="image/jpeg,image/png,video/mp4,audio/mpeg"
                onChange={(event) => {
                  const file = event.currentTarget.files ? event.currentTarget.files[0] : null;
                  setFieldValue("file", file);
                }}
                className={`mt-1 block w-full border border-gray-300 rounded-md ${
                  isSubmitting && !initialValues.file ? "border-red-500" : ""
                }`}
              />
              <ErrorMessage name="file" component="div" className="text-red-500 text-sm" />
            </div>
            <div>
              <label htmlFor="category" className="block text-sm font-medium">
                Category
              </label>
              <Field
                as="select"
                name="category"
                id="category"
                className="w-full p-2 mt-1 border rounded"
              >
                <option value="public">Public</option>
                <option value="private">Private</option>
              </Field>
              <ErrorMessage name="category" component="div" className="text-red-500 text-sm" />
            </div>
            <div>
              <label htmlFor="heading" className="block text-sm font-medium">
                Heading
              </label>
              <Field
                type="text"
                name="heading"
                id="heading"
                className="w-full p-2 mt-1 border rounded"
              />
              <ErrorMessage name="heading" component="div" className="text-red-500 text-sm" />
            </div>
            <div>
              <label htmlFor="description" className="block text-sm font-medium">
                Description
              </label>
              <Field
                as="textarea"
                name="description"
                id="description"
                className="w-full p-2 mt-1 border rounded"
                rows={4}
              />
            </div>
            
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-black text-white p-2 rounded"
            >
              {isSubmitting ? "Uploading..." : "Submit"}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AddForm;

"use client"

import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Header from './Header';
import Link from 'next/link';

interface SignupFormValues {
  firstName: string;
  lastName: string;
  country: string;
  dateOfBirth: string;
  email: string;
  password: string;
  confirmPassword: string;
  additionalInfo: string;
}

const SignUp: React.FC = () => {
  const initialValues: SignupFormValues = {
    firstName: '',
    lastName: '',
    country: '',
    dateOfBirth: '',
    email: '',
    password: '',
    confirmPassword: '',
    additionalInfo: '',
  };

  const validationSchema = Yup.object({
    firstName: Yup.string().required('First name is required'),
    lastName: Yup.string().required('Last name is required'),
    country: Yup.string().required('Country is required'),
    dateOfBirth: Yup.date()
      .max(new Date(), 'Date of birth must be in the past')
      .required('Date of birth is required'),
    email: Yup.string().email('Invalid email address').required('Email is required'),
    password: Yup.string()
      .min(6, 'Password must be at least 6 characters long')
      .required('Password is required'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password')], 'Passwords must match')
      .required('Confirm password is required'),
    additionalInfo: Yup.string().max(500, 'Additional information can be up to 500 characters'),
  });

  const handleSubmit = (values: SignupFormValues) => {
    // Handle form submission (e.g., API call)
    console.log('Form data:', values);
  };

  return (
    <>
    <Header/>
    <div className="flex items-center justify-center min-h-screen py-[40px]">
        <div className="max-w-md w-full p-4 bg-white shadow-md rounded-lg">
            <h2 className="text-2xl font-bold text-center mb-4">Registration</h2>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {({ isSubmitting }) => (
                <Form className="space-y-4">
                    <div>
                    <label htmlFor="firstName" className="block text-sm font-medium">
                        First Name
                    </label>
                    <Field
                        type="text"
                        name="firstName"
                        id="firstName"
                        className="w-full p-2 mt-1 border rounded"
                    />
                    <ErrorMessage name="firstName" component="div" className="text-red-500 text-sm" />
                    </div>

                    <div>
                    <label htmlFor="lastName" className="block text-sm font-medium">
                        Last Name
                    </label>
                    <Field
                        type="text"
                        name="lastName"
                        id="lastName"
                        className="w-full p-2 mt-1 border rounded"
                    />
                    <ErrorMessage name="lastName" component="div" className="text-red-500 text-sm" />
                    </div>

                    <div>
                    <label htmlFor="country" className="block text-sm font-medium">
                        Country
                    </label>
                    <Field as="select" name="country" id="country" className="w-full p-2 mt-1 border rounded">
                        <option value="">Select your country</option>
                        <option value="Afghanistan">Afghanistan</option>
                        <option value="Syria">Syria</option>
                        <option value="Ukraine">Ukraine</option>
                        {/* Add more countries as needed */}
                    </Field>
                    <ErrorMessage name="country" component="div" className="text-red-500 text-sm" />
                    </div>

                    <div>
                    <label htmlFor="dateOfBirth" className="block text-sm font-medium">
                        Date of Birth
                    </label>
                    <Field
                        type="date"
                        name="dateOfBirth"
                        id="dateOfBirth"
                        className="w-full p-2 mt-1 border rounded"
                    />
                    <ErrorMessage name="dateOfBirth" component="div" className="text-red-500 text-sm" />
                    </div>

                    <div>
                    <label htmlFor="email" className="block text-sm font-medium">
                        Email
                    </label>
                    <Field
                        type="email"
                        name="email"
                        id="email"
                        className="w-full p-2 mt-1 border rounded"
                    />
                    <ErrorMessage name="email" component="div" className="text-red-500 text-sm" />
                    </div>

                    <div>
                    <label htmlFor="password" className="block text-sm font-medium">
                        Password
                    </label>
                    <Field
                        type="password"
                        name="password"
                        id="password"
                        className="w-full p-2 mt-1 border rounded"
                    />
                    <ErrorMessage name="password" component="div" className="text-red-500 text-sm" />
                    </div>

                    <div>
                    <label htmlFor="confirmPassword" className="block text-sm font-medium">
                        Confirm Password
                    </label>
                    <Field
                        type="password"
                        name="confirmPassword"
                        id="confirmPassword"
                        className="w-full p-2 mt-1 border rounded"
                    />
                    <ErrorMessage name="confirmPassword" component="div" className="text-red-500 text-sm" />
                    </div>

                    <div>
                    <label htmlFor="additionalInfo" className="block text-sm font-medium">
                        Additional Information
                    </label>
                    <Field
                        as="textarea"
                        name="additionalInfo"
                        id="additionalInfo"
                        className="w-full p-2 mt-1 border rounded"
                        rows={4}
                    />
                    <ErrorMessage name="additionalInfo" component="div" className="text-red-500 text-sm" />
                    </div>

                    <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-black text-white p-2 rounded"
                    >
                    {isSubmitting ? 'Registering...' : 'Register'}
                    </button>
                    <div className="">
                        <p className='text-[14px]'>You have an account? <Link href="/auth/signin" className='text-blue-500 hover:underline'>Sign in</Link></p>
                    </div>
                </Form>
                )}
            </Formik>
        </div>
    </div>
    </>
    
    
  );
};

export default SignUp;

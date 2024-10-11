"use client";

import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Link from 'next/link';
import Header from './Header';

interface LoginFormValues {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const initialValues: LoginFormValues = {
    email: '',
    password: '',
  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .email('Invalid email address')
      .required('Email is required'),
    password: Yup.string()
      .min(6, 'Password must be at least 6 characters long')
      .required('Password is required'),
  });

  const handleSubmit = (values: LoginFormValues) => {
    // Handle login logic here (e.g., API request)
    console.log('Login data:', values);
  };

  return (
    <>
    <Header/>
    <div className="flex items-center justify-center min-h-screen">
      <div className="max-w-md w-full p-4 bg-white shadow-md rounded-lg">
        <h2 className="text-2xl font-bold text-center mb-4">Login</h2>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="space-y-4">
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
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-red-500 text-sm"
                />
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
                <ErrorMessage
                  name="password"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-black text-white p-2 rounded "
              >
                {isSubmitting ? 'Logging in...' : 'Login'}
              </button>
              <div className="">
                <p className='text-[14px]'>You don't have an account? <Link href="/auth/signup" className='text-blue-500 hover:underline'>Sign Up</Link></p>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
    </>
    
  );
};

export default Login;

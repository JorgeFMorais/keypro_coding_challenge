import React, { useState } from 'react';
import axios from 'axios';

/*
  This example requires some changes to your config:
*/
export default function Login() {
    const [formData, setFormData] = useState({
      email: '',
      password: '',
    });

    const handleChange = (e) => {
      setFormData({
          ...formData,
          [e.target.name]: e.target.value,
      });
    };

    const [isLoading, setIsLoading] = useState(false);

    const [successMessage, setSuccessMessage] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (isLoading) {
            return
        }

        setIsLoading(true)
        setSuccessMessage(null)
        setErrorMessage(null)

        try {
            const response = await axios.post('http://localhost:8000/api/login/', formData)
            console.log("Success", response)
            setSuccessMessage("Login successful")
            localStorage.setItem('accessToken', response.data.tokens.access)
            localStorage.setItem('refreshToken', response.data.tokens.refresh)
        } catch (error) {
            console.error("Error during login", error.response?.data)
            if (error.response && error.response.data) {
                Object.keys(error.response.data).forEach((key) => {
                    const errorMessages = error.response.data[key]
                    if (errorMessages && errorMessages.length > 0) {
                        setErrorMessage(errorMessages[0])
                    }
                })
            }
        }
        finally {
            setIsLoading(false)
        }
    };

    return (
      <>
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <img
              alt="Your Company"
              src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=600"
              className="mx-auto h-10 w-auto"
            />
            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
              Login to Points of Interest
            </h2>
          </div>
  
          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form action="#" method="POST" className="space-y-6">
              { 
                errorMessage 
                && 
                <div role="alert" className="rounded border-s-4 border-red-500 bg-red-50 p-4">
                    <strong className="block font-medium text-red-800"> Invalid Form </strong>
                    <p className="mt-2 text-sm text-red-700">
                        {errorMessage}
                    </p>
                </div>
              }    
              <div>
                <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                  Email address
                </label>
                <div className="mt-2">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
              </div>
  
              <div>
                <div className="flex items-center justify-between">
                  <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                    Password
                  </label>
                </div>
                <div className="mt-2">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    required
                    autoComplete="current-password"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    value={formData.password}
                    onChange={handleChange}
                  />
                </div>
              </div>
  
              <div>
                <button
                  type="submit"
                  disabled={isLoading}
                  onClick={handleSubmit}
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Login
                </button>
              </div>
            </form>
  
            <p className="mt-10 text-center text-sm text-gray-500">
              Not a member?{' '}
              <a href="/register" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                Register
              </a>
            </p>
          </div>
        </div>
      </>
    )
  }
  
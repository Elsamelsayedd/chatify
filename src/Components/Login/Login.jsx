import axios from 'axios';
import { useFormik } from 'formik';
import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup'
import { url } from '../Url/Url';

export default function Login() {



    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('')

    let navigate = useNavigate()


    async function login(values) {
        try {
            setLoading(true)
            let { data } = await axios.post(
                `${url}auth/login`,
                values,
                { withCredentials: true }
            );



            console.log(data.data.token);
            localStorage.setItem('token', data.data.token);

            // Retrieve cookies
            const cookies = document.cookie;
            console.log("Cookies:", cookies);
            // setLoading(true)
            navigate('/')


        } catch (error) {
            console.log(error.response.data.error.message);
            setLoading(false);
            toast.error(error.response.data.error.message)

            setMessage(error.response.data.error.message)

        }
    }


    let validationSchema = Yup.object().shape({
        email: Yup.string().email().required('Email is required'),
        password: Yup.string().min(8, 'min is 8').max(128, 'max is 128').required('Password is required'),

    }

    )


    let formik = useFormik({
        initialValues: {

            email: '',
            password: '',


        }, onSubmit: login,
        validationSchema
    })




    return (
        <>
            <div className=' h-screen text-white overflow-auto  w-full md:flex  justify-center items-center bg-[#111B23]'>
                <div className='md:w-[30%] rounded-xl mt-14 bg-[#202B35] py-11 px-2'>
                    <p className='text-white text-center text-3xl mt-5 font-bold'>Welcome back</p>
                    <p className='text-white text-center'>Sign in </p>

                    <form onSubmit={formik.handleSubmit} className='mx-auto mt-9'>
                        <div className="mt-5 w-[90%] mx-auto">
                            <label htmlFor="email" className="block mb-2 text-sm font-medium text-white dark:text-white">Email Address</label>
                            <input onChange={formik.handleChange} onBlur={formik.handleBlur} name='email' value={formik.values.email} type="email" id="email" className="bg-[#111B23] border border-gray-300 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                        </div>

                        {formik.touched.email && formik.errors.email ? <div className="p-2 mt-2 w-[90%] mx-auto text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                            <p>{formik.errors.email}</p>
                        </div> : ''}

                        <div className="mt-5 w-[90%] mx-auto">
                            <label htmlFor="password" className="block mb-2 text-sm font-medium text-white dark:text-white">Password</label>
                            <input onChange={formik.handleChange} onBlur={formik.handleBlur} name='password' value={formik.values.password} type="password" id="password" className="bg-[#111B23] border border-gray-300 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                        </div>

                        {formik.touched.password && formik.errors.password ? <div className="p-2 mt-2 w-[90%] mx-auto text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                            <p>{formik.errors.password}</p>
                        </div> : ''}



                        <div className=' text-center mt-5'>
                            {loading ? <button className='text-white w-[90%] py-4 px-2 rounded-3xl  bg-[#29A684]'><i className='fas fa-spinner fa-spin-pulse'></i> </button>
                                : <button className='text-white w-[90%] py-4 px-2 rounded-3xl  bg-[#29A684]'>Sign in </button>
                            }
                        </div>


                    </form>


                    <p className='text-center mt-5'>you do not have an account ?</p>
                    <p className='text-center cursor-pointer' onClick={() => navigate('/signup')}>Sign up</p>

                </div>
            </div>
        </>
    )
}

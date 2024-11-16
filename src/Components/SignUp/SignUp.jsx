import { data } from 'autoprefixer'
import axios from 'axios'
import { useFormik } from 'formik'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import * as Yup from 'yup'
import toast, { Toaster } from 'react-hot-toast';
import { url } from '../Url/Url'


export default function SignUp() {
    let navigate = useNavigate()
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [imageUrl, setImageUrl] = useState(null)
    const preset_key = '143481751886955';
    const cloud_name = 'dsq6bzdak';


    async function handlefile(e) {
        const file = e.target.files[0];
        const formData = new FormData();
        formData.append('file', file)
        formData.append('upload_preset', preset_key);



        try {
            let { data } = await axios.post(`https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`, formData);
            formik.setFieldValue('picture', data.secure_url)
            console.log(data.secure_url);




        } catch (error) {
            console.log(error);

        }
        // console.log(e.target.files[0]);

    }









    async function register(values) {
        try {
            setLoading(true)
            let { data } = await axios.post(
                `${url}auth/register`,
                values,
                { withCredentials: true }
            );

            console.log(data);

            localStorage.setItem('token', data.data.token);

            // Retrieve cookies
            // const cookies = document.cookie;
            // console.log("Cookies:", cookies);
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
        name: Yup.string().max(16, 'max is 16').min(3, 'min is 3').required('Name is required'),
        email: Yup.string().email().required('Email is required'),
        password: Yup.string().min(8, 'min is 8').max(128, 'max is 128').required('Password is required'),
        status: Yup.string().max(64, 'max is 64'),

    }

    )



    let formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            password: '',
            status: '',
            picture: ''
        }, onSubmit: register,
        validationSchema
    })



    return (
        <>
            <div className=' min-h-screen text-white overflow-auto w-full md:flex justify-center items-center bg-[#111B23]'>
                <div className='md:w-[30%] rounded-xl bg-[#202B35] py-3  mt-10 px-2'>
                    <p className='text-white text-center text-3xl mt-2 font-bold'>Welcome </p>
                    <p className='text-white text-center'>Sign up </p>

                    {/* {message ? <div className="p-2 mt-2 w-[90%] mx-auto text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                        <p>{message}</p>
                    </div> : ''} */}


                    <form onSubmit={formik.handleSubmit} className='mx-auto mt-5'>
                        <div className="mt-5 w-[90%] mx-auto">
                            <label htmlFor="name" className="block mb-2 text-sm font-medium text-white dark:text-white">Full Name</label>
                            <input onChange={formik.handleChange} onBlur={formik.handleBlur} name='name' value={formik.values.name} type="text" id="name" className="bg-[#111B23] border border-gray-300 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                        </div>

                        {formik.touched.name && formik.errors.name ? <div className="p-2 mt-2 w-[90%] mx-auto text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                            <p>{formik.errors.name}</p>
                        </div> : ''}


                        <div className="mt-5 w-[90%] mx-auto">
                            <label htmlFor="email" className="block mb-2 text-sm font-medium text-white dark:text-white">Email Address</label>
                            <input onChange={formik.handleChange} onBlur={formik.handleBlur} name='email' value={formik.values.email} type="email" id="email" className="bg-[#111B23] border border-gray-300 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                        </div>

                        {formik.touched.email && formik.errors.email ? <div className="p-2 mt-2 w-[90%] mx-auto text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                            <p>{formik.errors.email}</p>
                        </div> : ''}


                        <div className="mt-5 w-[90%] mx-auto">
                            <label htmlFor="Status" className="block mb-2 text-sm font-medium text-white dark:text-white">Status (Optional)</label>
                            <input onChange={formik.handleChange} onBlur={formik.handleBlur} name='status' value={formik.values.status} type="text" id="Status" className="bg-[#111B23] border border-gray-300 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                        </div>

                        {formik.touched.status && formik.errors.status ? <div className="p-2 mt-2 w-[90%] mx-auto text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                            <p>{formik.errors.status}</p>
                        </div> : ''}


                        <div className="mt-5 w-[90%] mx-auto">
                            <label htmlFor="password" className="block mb-2 text-sm font-medium text-white dark:text-white">Password</label>
                            <input onChange={formik.handleChange} onBlur={formik.handleBlur} name='password' value={formik.values.password} type="password" id="password" className="bg-[#111B23] border border-gray-300 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                        </div>

                        {formik.touched.password && formik.errors.password ? <div className="p-2 mt-2 w-[90%] mx-auto text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                            <p>{formik.errors.password}</p>
                        </div> : ''}


                        {/* <div className="mt-5 w-[90%] mx-auto">
                            <label htmlFor="Picture" className="block mb-2 text-sm font-medium text-white dark:text-white">Picture (Optional)</label>
                            <input onChange={formik.handleChange} onBlur={formik.handleBlur} name='picture' value={formik.values.picture} className="block p-2 w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-[#111B23] dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" id="Picture" type="file" />
                        </div> */}


                        <div className="mt-5 w-[90%] mx-auto">
                            <label htmlFor="Picture" className="block mb-2 text-sm font-medium text-white dark:text-white">Picture (Optional)</label>
                            <input onChange={handlefile} onBlur={formik.handleBlur} name='picture' className="block p-2 w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-[#111B23] dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" id="Picture" type="file" />
                        </div>





                        <div className=' text-center mt-5'>
                            {loading ? <button className='text-white w-[90%] py-4 px-2 rounded-3xl  bg-[#29A684]'><i className='fas fa-spinner fa-spin-pulse'></i> </button>
                                : <button className='text-white w-[90%] py-4 px-2 rounded-3xl  bg-[#29A684]'>Sign up </button>
                            }
                        </div>


                    </form>


                    <p className='text-center mt-5'> have an account ?</p>
                    <p className='text-center cursor-pointer' onClick={() => navigate('/login')}>Sign in</p>

                </div>
            </div>


        </>
    )
}

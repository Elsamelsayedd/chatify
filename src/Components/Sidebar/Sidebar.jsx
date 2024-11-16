import React, { useContext, useEffect, useState } from 'react'
import me from '../../assets/me.jpg'
import axios from 'axios';
import { url } from '../Url/Url';
import { data } from 'autoprefixer';
import { Link } from 'react-router-dom';
import { GetChatContext } from '../../Context/GetChatContext/GetChatContext';


export default function Sidebar() {

    const [hide, setHide] = useState(false)
    const [chats, setChats] = useState([])
    const [img, setImg] = useState([])
    const [user, setUser] = useState(null)
    const { getchat } = useContext(GetChatContext)


    async function getUser() {
        try {
            let { data } = await axios.get(`${url}user/getme`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })

            setUser(data)

        } catch (error) {
            console.log(error);

        }
    }

    function formatWhatsAppDate(timestamp) {
        const date = new Date(timestamp);
        const now = new Date();

        // Helper functions to check if the date is today or yesterday
        const isToday = date.toDateString() === now.toDateString();
        const isYesterday = new Date(now - 86400000).toDateString() === date.toDateString();

        // Formatting
        if (isToday) {
            return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        } else if (isYesterday) {
            return "Yesterday";
        } else if (now - date < 7 * 86400000) {
            return date.toLocaleDateString('en-US', { weekday: 'long' });
        } else {
            return date.toLocaleDateString('en-GB'); // format as DD/MM/YY
        }
    }

    // Example usage



    async function getChats() {
        try {
            let { data } = await axios.get(`${url}conversation`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
            console.log(data[0]);
            setChats(data)


            // setImg(data[0].users[0].picture)

        } catch (error) {
            console.log(error);

        }
    }

    useEffect(() => {
        getChats()
        getUser()


    }, [])


    return (
        <>
            <div className='w-[20%]  fixed top-0 md:left-0 md:right-[80%]'>
                <div className=' border-e-[1px] border-gray-500'>
                    <div className=' p-2  flex items-center justify-between bg-[#2B3941]'>
                        <div className='personalPhoto'>
                            <img src={user?.picture} alt="personal photo" className='w-8 h-8  rounded-full' />
                        </div>
                        <div className='gap-x-6 flex px-2'>
                            <i className="fa-solid fa-people-group fa-lg text-gray-500"></i>
                            <i className="fa-solid fa-circle-notch fa-lg text-gray-500"></i>
                            <i className="fa-solid fa-comment-dots fa-lg text-gray-500"></i>
                            <i className="fa-solid fa-ellipsis-vertical fa-lg text-gray-500"></i>
                        </div>
                    </div>
                    {hide ? '' : <div className='px-3 py-5 bg-[#202C35] flex justify-between items-center'>
                        <div className='silent-ntifcation flex w-10 h-10 justify-center items-center bg-blue-400 rounded-full'>
                            <i className="fa-solid fa-bell-slash  text-center "></i>
                        </div>
                        <div className=''>
                            <p className='text-white'>Get notified of new messages</p>
                            <p className='text-gray-300 text-sm'>Turn on desktop notifcations {">"}</p>
                        </div>
                        <div className='cursor-pointer' onClick={() => setHide(true)}>
                            <i className="fa-solid fa-x text-gray-300"></i>
                        </div>
                    </div>}

                    <div className='bg-[#111B23] py-1 px-2 flex items-center justify-between'>

                        <form className="w-[90%]  mx-auto ">
                            <div className="relative ">
                                <div className="absolute inset-y-0 start-0  flex items-center ps-3 pointer-events-none">
                                    <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                                    </svg>
                                </div>
                                <input type="search" id="default-search" className="block type w-full rounded-lg p-2 ps-10 text-sm  border-b-[1px]   bg-[#2B3941] dark:bg-gray-700 dark:border-b-gray-600 dark:placeholder-gray-400 text-gray-100 " placeholder="Search or start a new chat" />
                            </div>
                        </form>



                    </div>
                </div>



                {/* h-screen overflow-y-auto  */}
                <div className=' h-screen overflow-y-auto sidebar-scroll  bg-[#111B23] border-e-[1px] border-gray-500'>



                    <div className='py-3 -200 bg-[#111b23f4] '>

                        {chats?.map(chat => <div onClick={() => getchat(chat._id)} key={chat._id} className='cursor-pointer hover:bg-[#2B3941] hover:transition-all hover:duration mb-2 w-full px-2' >
                            <div className='flex justify-between items-center w-full' >
                                <div className='  flex items-center py-1  rounded-full'>
                                    <img src={chat.picture} alt="personal photo" className='w-12 h-12 rounded-full' />
                                    <div className='ms-2'>
                                        <p className='text-white '>{chat.name}</p>
                                        <p className='text-gray-300 text-sm '>{chat.latestMessage.files.length > 0 ? <><i className="fa-regular fa-file"></i> <span className='ms-1'>file</span></> : chat.latestMessage.message.length > 20 ? chat.latestMessage.message.split(' ').slice(0, 3).join(' ') + '....' : chat.latestMessage.message}  </p>
                                    </div>
                                </div>
                                <>
                                    <p className='text-gray-300 text-sm'>{formatWhatsAppDate(chat.latestMessage.updatedAt)} </p>
                                </>
                            </div>
                        </div>
                        )}

                        {/* <div className='  flex items-center   rounded-full'>
                            <img src={me} alt="personal photo" className='w-12 h-12 rounded-full' />
                            <div className='ms-2'>
                                <p className='text-white '>eslam elsayed</p>
                                <p className='text-gray-300 text-sm '>hello.</p>
                            </div>
                        </div>
                        <div>
                            <p className='text-gray-300 text-sm'>16 min</p>
                        </div> */}



                    </div>






















                </div>









            </div>
        </>
    )
}

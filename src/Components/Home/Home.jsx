import React, { useContext, useEffect, useState } from 'react'
import me from '../../assets/me.jpg'
import bgWhatsApp from '../../assets/bg-whatsApp.jpg'
import { RefreshContext } from '../../Context/RefreshContext/RefreshContext'
import Sidebar from '../Sidebar/Sidebar'
import Chat from '../Chat/Chat'

export default function Home() {







    // const { RefreshToken } = useContext(RefreshContext)
    // useEffect(() => {
    //     RefreshToken()


    // }, [])


    return (
        <>
            <div className='w-[100%] flex'>
                <Sidebar />





                <Chat />
            </div>





        </>
    )
}

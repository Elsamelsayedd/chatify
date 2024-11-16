import axios from "axios";
import { createContext, useState } from "react";


export let RefreshContext = createContext(0)



export default function RefreshContextProvider(props) {


    async function RefreshToken() {
        try {
            let { data } = await axios.post(`https://chatify-5zejudgb8-adham20022023s-projects.vercel.app/api/v1/auth/refreshtoken`, {}, {
                withCredentials: true
            })

            console.log(data);

        } catch (error) {
            console.log(error);

        }
    }




    return <RefreshContext.Provider value={{ RefreshToken }}>
        {props.children}
    </RefreshContext.Provider>
}

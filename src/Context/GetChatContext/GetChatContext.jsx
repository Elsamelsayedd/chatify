import { createContext, useState } from "react";
import { url } from "../../Components/Url/Url";
import axios from "axios";


export let GetChatContext = createContext(0)



export default function GetChatContextProvider(props) {

    const [massageChat, setMassageChat] = useState([])

    async function getchat(id) {
        try {
            let { data } = await axios.get(`${url}message/${id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`

                }

            })

            console.log(data);
            setMassageChat(data)







        } catch (error) {
            console.log(error);

        }
    }




    return <GetChatContext.Provider value={{ getchat, massageChat }}>
        {props.children}
    </GetChatContext.Provider>


}

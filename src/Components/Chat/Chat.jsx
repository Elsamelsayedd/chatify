import React, { useContext, useEffect, useRef } from "react";
import bgWhatsApp from "../../assets/bg-whatsApp.jpg";
import me from "../../assets/me.jpg";
import { useParams } from "react-router-dom";
import axios from "axios";
import { url } from "../Url/Url";
import { GetChatContext } from "../../Context/GetChatContext/GetChatContext";
import { io } from "socket.io-client";

// Replace with your server URL
const socket = io("http://localhost:8000", {
  transports: ["websocket", "polling"], // Ensure the transports match
  withCredentials: true, // Set this if the server uses credentials
});

export default function Chat() {
  const { massageChat } = useContext(GetChatContext);
  const lastMessageRef = useRef(null);

  console.log(massageChat);

  function formatWhatsAppDate(timestamp) {
    const date = new Date(timestamp);
    const now = new Date();

    const isToday = date.toDateString() === now.toDateString();
    const isYesterday =
      new Date(now - 86400000).toDateString() === date.toDateString();

    if (isToday) {
      return date.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
    } else if (isYesterday) {
      return "Yesterday";
    } else if (now - date < 7 * 86400000) {
      return date.toLocaleDateString("en-US", { weekday: "long" });
    } else {
      return date.toLocaleDateString("en-GB");
    }
  }
  useEffect(() => {
    socket.on("connect", () => {
      console.log("Connected to the server", socket.id);
    });
  });

  useEffect(() => {
    if (lastMessageRef.current) {
      lastMessageRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [massageChat]);

  return (
    <>
      <div
        className="w-[77%] ms-[20%] bg-fixed bg-contain pe-2 "
        style={{ backgroundImage: `url(${bgWhatsApp})` }}
      >
        <div className="fixed top-0 md:left-[20%] md:right-[3%]">
          <div className="p-2 flex items-center justify-between bg-[#2B3941]">
            <div className="personalPhoto flex items-center">
              <img
                src={me}
                alt="personal photo"
                className="w-8 h-8 rounded-full"
              />
              <div className="ms-2">
                <p className="text-white">
                  {massageChat[0]?.conversation.name}
                </p>
                <p className="text-gray-300 text-sm">Online</p>
              </div>
            </div>
            <div className="gap-x-6 flex px-2">
              <i className="fa-solid fa-video fa-lg text-gray-500"></i>
              <i className="fa-solid fa-phone fa-lg text-gray-500"></i>
              <i className="fa-solid fa-magnifying-glass fa-lg text-gray-500"></i>
              <i className="fa-solid fa-ellipsis-vertical fa-lg text-gray-500"></i>
            </div>
          </div>
        </div>

        <div className="my-16 pb-5 ms-2">
          {massageChat.map((message, index) => (
            <div
              key={message._id}
              ref={index === massageChat.length - 1 ? lastMessageRef : null}
              className="py-1 px-2 ms-3 rounded-lg text-white my-2 me-auto w-fit max-w-[80%] bg-[#2B3941]"
            >
              <div>
                <p className="me-8 break-words overflow-wrap-anywhere">
                  {message.message}
                </p>
                <p className="me-auto flex justify-end text-gray-300 text-xs">
                  {formatWhatsAppDate(message.createdAt)}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="fixed bottom-1 left-[20%] md:right-[3%]">
          <div className="bg-[#111B23] py-3 px-2 flex items-center justify-between">
            <div className="md:ms-3 flex items-center ">
              <i className="fa-solid fa-face-smile text-gray-300 fa-xl me-1 md:me-3 cursor-pointer"></i>
              <div className="icon-upload me-1">
                <label htmlFor="file-input" className="cursor-pointer">
                  <i className="fa-solid fa-link text-gray-300 fa-xl"></i>
                </label>
                <input
                  id="file-input"
                  type="file"
                  style={{ display: "none" }}
                />
              </div>
            </div>

            <form className="w-[80%] type me-1 ">
              <input
                type="text"
                id="message"
                className="type block w-full p-2 ps-10 text-sm rounded-lg bg-[#111B23] dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 text-gray-100"
                placeholder="Type a message"
              />
            </form>

            <div className="">
              <i className="fa-solid fa-paper-plane text-gray-300 fa-xl rotate-45"></i>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

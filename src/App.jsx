import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './Components/Layout/Layout'
import Login from './Components/Login/Login'
import SignUp from './Components/SignUp/SignUp'
import Home from './Components/Home/Home'
import { Toaster } from "react-hot-toast";
import Notfound from './Components/Notfound/Notfound'
import ProtectedRoute from './Components/ProtectedRoute/ProtectedRoute'
import RefreshContextProvider from './Context/RefreshContext/RefreshContext'
import GetChatContextProvider from './Context/GetChatContext/GetChatContext'

function App() {
  const [count, setCount] = useState(0)


  let router = createBrowserRouter([{
    path: '', element: <Layout />, children: [
      { index: true, element: <ProtectedRoute><Home /></ProtectedRoute> },
      { path: '/login', element: <Login /> },
      { path: '/SignUp', element: <SignUp /> },
      { path: '*', element: <Notfound /> }
    ]
  }])

  return (
    <>
      <RefreshContextProvider>
        <GetChatContextProvider>
          <RouterProvider router={router}>

          </RouterProvider>
          <Toaster
            toastOptions={{
              duration: 20000
            }}
          />
        </GetChatContextProvider>
      </RefreshContextProvider>
    </>
  )
}

export default App

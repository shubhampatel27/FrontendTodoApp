import React, { useState } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import "./style/app.scss"
import { createContext } from 'react'


export const server = "https://todoapp-k0ji.onrender.com/api/v1";

export const Context = createContext({isAuthenticated:false});

export const AppWrapper = ()=>{
  const [isAuthenticated ,setAuthenticated] = useState(false);
  const [loading ,setLoading] = useState(false);
  const [user,setUser] = useState({});
  return(
  <Context.Provider value={
  { isAuthenticated,
    setAuthenticated,
    loading,
    setLoading,
    user,
    setUser
  }
  }>
       <App />
  </Context.Provider>
  )
}
  
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
  <AppWrapper/>
  </React.StrictMode>
)

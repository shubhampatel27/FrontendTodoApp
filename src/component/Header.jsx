import axios from 'axios'
import React, { useContext } from 'react'
import { toast } from 'react-hot-toast'

import {Link ,useNavigate} from 'react-router-dom'
import { Context, server } from '../main'



const Header = () => {


  const {isAuthenticated,setAuthenticated,loading,setLoading}= useContext(Context)
  const navigate = useNavigate();

  const logoutHandler = async (event) => {
    setLoading(true);
    try {
      const { data } = await axios.get(
        `${server}/user/logout`,
    
        {
          withCredentials: true,
        }
      );

      toast.success(data.message);
      setAuthenticated(false);
      setLoading(false);
      
      navigate("/login")

    } catch (error) {
      toast.error(error.response.data.message);
      setAuthenticated(true);
      setLoading(false);

    }
  };


  return (
    <nav className='header'>
        <div>
            <h2>Todo</h2>
        </div>
        <article>
          <Link to={"/"}>Home</Link>
          <Link to={"/profile"}>Profile</Link>
        
          {
            isAuthenticated ? <button disabled ={loading} onClick={logoutHandler} className='btn'>logout</button>:
            <Link to={"/login"}>login</Link>
          }
         
        </article>
    </nav>
  )
}

export default Header
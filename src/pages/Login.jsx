import axios from 'axios';
import React, { useContext, useState } from 'react'
import { toast } from 'react-hot-toast';
import { Link, Navigate } from 'react-router-dom'
import { Context, server } from '../main';
import Register from './Register'

const Login = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  const {isAuthenticated , setAuthenticated , loading, setLoading} = useContext(Context)

  const submitHandler = async (event) => {
    setLoading(true);
    event.preventDefault();

    try {

      const { data } = await axios.post(
        `${server}/user/login`,
        {
          email,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      toast.success(data.message);
      setAuthenticated(true);
      setLoading(false);

    } catch (error) {
      toast.error(error.response.data.message);
      setLoading(false);
      setAuthenticated(false);
    }
  };

  if(isAuthenticated) return <Navigate to={"/"}/>

  return (
    <div className='login'>
   
      <section>
        <form onSubmit={submitHandler} action="">
        <input
            type="email"
            placeholder="Enter your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Enter your Password here"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button disabled={loading} type='submit'>login</button>
          <h4>or</h4>
          <Link to='/register'>SignUp</Link>
        </form>
      </section>

    </div>
  )
}

export default Login
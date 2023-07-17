import React, { useContext, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import { Context, server } from "../main";
import toast from "react-hot-toast";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  const {isAuthenticated , setAuthenticated ,loading , setLoading} = useContext(Context)

  const submitHandler = async (event) => {
    setLoading(true);
    event.preventDefault();
    try {
      const { data } = await axios.post(
        `${server}/user/new`,
        {
          name,
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
      setAuthenticated(false);
      setLoading(false);
      console.log(error);
    }
  };
    if(isAuthenticated) return <Navigate to={"/"}/>
  return (
    <div className="login">
      <section>
        <form onSubmit={submitHandler} action="">
          <input
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
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

          <button disabled={loading} type="submit">SignUp</button>
          <h3>or</h3>
          <Link to="/login">login</Link>
        </form>
      </section>
    </div>
  );
};

export default Register;

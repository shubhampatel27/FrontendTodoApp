import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./component/Header";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Register from "./pages/Register";
import { Toaster } from "react-hot-toast";
import React, { useContext, useEffect } from "react";
import axios from "axios";
import { Context, server } from "./main";

function App() {
  const { user, setUser, setAuthenticated, setLoading } = useContext(Context);
  useEffect(() => {
    setLoading(true);

    axios
      .get(`${server}/user/my`, {
        withCredentials: true,
      })
      .then((res) => {
        setUser(res.data.user);
        setAuthenticated(true);
        setLoading(false);
      })
      .catch(() => {
        setUser({});
        setAuthenticated(false);
        setLoading(false);
      });
  }, []);
  return (
    <React.Fragment>
      <Router>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
          <Toaster />
      </Router>
    </React.Fragment>
  );
}

export default App;

import React, { useEffect } from 'react'
import Admin_Header from './Admin_Header'
import AdminShop from './AdminShop'
import { useNavigate } from 'react-router-dom'
import {jwtDecode} from "jwt-decode";


const Main = () => {
    const navigate = useNavigate();
    // useEffect(() => {
    //     const token = localStorage.getItem("token");
    //     const role = localStorage.getItem("role");
    //     if (!token) {
    //         navigate('/login');
    //     }
    //     if (role !== "admin") {
    //         navigate('/NotAccessible');
    //     }
  // },[])
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate('/login');
    } else {
      try {
        const decode = jwtDecode(token);
        const currTime = Date.now() / 1000;
        console.log(decode.exp /1000);
        if (decode.exp < currTime) {
          localStorage.removeItem("token");
          navigate("login");
        } else {
          console.log("Valid Token :",token);
        }
        console.log(decode);
      } catch (e) {
        console.log("Error in decoding token in home page : ", e);
        localStorage.removeItem("token");
        navigate("/login");
      }
    }
    // console.log(token);
  },[])
  return (
    <div>
          <Admin_Header />
          <AdminShop />
    </div>
  )
}

export default Main

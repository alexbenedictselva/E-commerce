import React, { useEffect } from 'react'
import './CheckOut.css';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import ProductElements from './components/ProductElements';
import Address from './components/Address';
const CheckOut = () => {
    const navigate = useNavigate();
    useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
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
    if (role === "admin") {
      navigate("/login");
    }
  },[])
  return (
      <div id='CheckOut'>
          <ProductElements />
          {/* <Address /> */}
    </div>
  )
}

export default CheckOut

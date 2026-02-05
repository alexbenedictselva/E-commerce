import React, { useEffect } from 'react'
import Header from './components/Header1'
import Hero from './components/Hero'
import Features from './components/Features'
import Sales1 from './components/Sales1'
import Banner1 from './components/Banner1'
import Sales2 from './components/Sales2'
import Banner2 from './components/Banner2'
import Banner3 from './components/Banner3'
import SearchDown from './components/Search_down'
import {jwtDecode} from "jwt-decode";
import Fotter from './components/Fotter'
import {  useNavigate } from 'react-router-dom'

const Home = () => {
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
    console.log(role);
    if (role === "admin") {
      navigate("/login");
    }
    // console.log(token);
  },[navigate])
  return (
    <div>
      <Header />
      <Hero />
      <Features />
      <Sales1 />
      <Banner1 />
      <Sales2 />
      <Banner2 />
      <Banner3 />
      <SearchDown />
      <Fotter />
    </div>
  )
}

export default Home

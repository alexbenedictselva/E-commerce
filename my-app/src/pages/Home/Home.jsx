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
import Fotter from './components/Fotter'
import {  useNavigate } from 'react-router-dom'

const Home = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate('/login');
    }
  },[])
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

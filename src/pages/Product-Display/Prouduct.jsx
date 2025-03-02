import React, { useEffect } from 'react'
import './Product.css';
import ProdContent from './components/ProdContent';
import Header from '../Home/components/Header1';
import Fotter from '../Home/components/Fotter';
const Prouduct = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    },[])
  return (
      <div>
          <Header />
          <ProdContent />
          <Fotter />
    </div>
  )
}

export default Prouduct

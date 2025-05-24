import React, { useEffect } from 'react'
import './AdProd.css';
import Fotter from '../../Home/components/Fotter';
import AdProdContent from './components/AdProdContent';
import Admin_Header from '../../Home/components/Admin/Admin_Header';
const AdProd = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    },[])
  return (
      <div>
          <Admin_Header />
          <AdProdContent />
    </div>
  )
}

export default AdProd

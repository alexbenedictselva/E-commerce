import React, { useEffect } from 'react'
import './AdProd.css';
import Fotter from '../../Home/components/Fotter';
import AdProdContent from './components/AdProdContent';
import Admin_Header from '../../Home/components/Admin/Admin_Header';
import { useNavigate } from 'react-router-dom';
const AdProd = () => {
    const navigate = useNavigate();
    useEffect(() => {
        const token = localStorage.getItem("token");
        const role = localStorage.getItem("role");
        if (!token) {
            navigate('/login');
        }
        if (role !== "admin") {
            navigate('/NotAccessible');
        }
    },[])
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

import React, { useEffect } from 'react'
import Admin_Header from '../Home/components/Admin/Admin_Header'
import { useNavigate, useParams } from 'react-router-dom'
import ProdContents from './components/ProdContents';

const UpdateProd = () => {
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
  return (
    <div>
          <Admin_Header />
          <ProdContents />
    </div>
  )
}

export default UpdateProd

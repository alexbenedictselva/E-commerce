import React, { useEffect } from 'react'
import Admin_Header from './Admin_Header'
import AdminShop from './AdminShop'
import { useNavigate } from 'react-router-dom'

const Main = () => {
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
          <AdminShop />
    </div>
  )
}

export default Main

import React, { useEffect } from 'react'
import Admin_Header from './components/Admin/Admin_Header'
import { useNavigate } from 'react-router-dom';

const Admin = () => {
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
    </div>
  )
}

export default Admin

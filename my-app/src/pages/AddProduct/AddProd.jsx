import React, { useEffect } from "react";
import ProdPage from "./Components/ProdPage";
import "./addProd.css";
import Admin_Header from "../Home/components/Admin/Admin_Header";
import { useNavigate } from "react-router-dom";
const AddProd = () => {
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
      <ProdPage />
    </div>
  );
};

export default AddProd;

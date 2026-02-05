import React, { useEffect } from "react";
import ProdPage from "./Components/ProdPage";
import "./addProd.css";
import AdminHeader from "../Home/components/Admin/Admin_Header";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
const AddProd = () => {
  const navigate = useNavigate();
  useEffect(() => {
      const token = localStorage.getItem("token");
      const role = localStorage.getItem("role");
      if (!token) {
          navigate('/login');
      } else {
        try {
          const decode = jwtDecode(token);
          const CurrTime = Date.now() / 1000; 
          if (decode.exp < CurrTime) {
            navigate("/login");
          } else {
            console.log("Valid Token:",token);
          }
        } catch (e) {
          console.log("Error in Main.jsx :",e);
        }
    }
    console.log();
      if (role !== "admin") {
          navigate('/NotAccessible');
      }
},[navigate])
  return (
    <div>
      <AdminHeader />
      <ProdPage />
    </div>
  );
};

export default AddProd;

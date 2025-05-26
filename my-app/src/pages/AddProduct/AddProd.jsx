import React from "react";
import ProdPage from "./Components/ProdPage";
import "./addProd.css";
import Admin_Header from "../Home/components/Admin/Admin_Header";
const AddProd = () => {
  return (
    <div>
      <Admin_Header />
      <ProdPage />
    </div>
  );
};

export default AddProd;

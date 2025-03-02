import React, { useState } from "react";
import "./shop.css";
import Header from "../Home/components/Header1";
import ShopContent from "./ShopContent";
import Options from "./components/options";
const Shop = () => {
  return (
    <div>
      <Header />
      <div style={{ paddingTop: "130px" }}>
        <ShopContent />
      </div>
          {/* <ShopContent /> */}
          {/* <Options /> */}
    </div>
  );
};

export default Shop;

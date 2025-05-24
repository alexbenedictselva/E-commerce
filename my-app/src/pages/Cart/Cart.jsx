import React from "react";
import "./cart.css";
import Header from "../Home/components/Header1";
import CartItem from "./component/CartItems";
const Cart = () => {
  return (
    <div>
      <Header />
      <div className="cartDiv">
        <CartItem />
      </div>
    </div>
  );
};

export default Cart;

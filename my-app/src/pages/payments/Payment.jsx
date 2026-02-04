import React from "react";
import RazorpayPayment from "./components/RazorpayPayment";

const Payment = () => {
  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        gap: "20px",
      }}
    >
      <RazorpayPayment />
    </div>
  );
};

export default Payment;

import React from "react";

const RazorpayPayment = ({ amount, disabled, userInfo }) => {
  const handlePayment = async () => {
    try {
      // 1️⃣ Call backend to create order
      const response = await fetch(
        "http://localhost:5000/api/payment/create-order",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            amount: amount || 500, // use passed amount or default
          }),
        }
      );

      const order = await response.json();

      if (!order.id) {
        alert("Order creation failed");
        return;
      }

      // 2️⃣ Razorpay checkout options
      const options = {
        key: "rzp_test_S6iklUmw2XaXsB", // 🔑 YOUR RAZORPAY KEY ID
        amount: order.amount,
        currency: order.currency,
        order_id: order.id,

        name: "E-Commerce App",
        description: "Order Payment",

        handler: async function (response) {
          console.log("Payment Success:", response);

          // 3️⃣ Verify payment on backend
          const verifyResponse = await fetch(
            "http://localhost:5000/api/payment/verify-payment",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(response),
            }
          );

          const verifyResult = await verifyResponse.json();

          if (verifyResult.success) {
            alert("Payment Successful & Verified");
          } else {
            alert("Payment verification failed");
          }
        },

        prefill: {
          name: userInfo?.name || "Alex",
          email: userInfo?.email || "alex@example.com",
          contact: userInfo?.phoneNumber || "9999999999",
        },

        theme: {
          color: "#3399cc",
        },
      };

      // 4️⃣ Open Razorpay popup
      const razorpay = new window.Razorpay(options);
      razorpay.open();

    } catch (error) {
      console.error("Payment error:", error);
      alert("Something went wrong");
    }
  };

  return (
    <button
      onClick={handlePayment}
      disabled={disabled}
      className={`button payment-btn ${disabled ? 'disabled' : ''}`}
      style={{
        padding: "10px",
        fontSize: "14px",
        backgroundColor: disabled ? "#f5f5f5" : "aliceblue",
        color: disabled ? "#999" : "#000",
        border: disabled ? "1px solid #ddd" : "1px solid rgb(144, 171, 195)",
        borderRadius: "5px",
        cursor: disabled ? "not-allowed" : "pointer",
        flex: 1,
      }}
    >
      Proceed to Payment
    </button>
  );
};

export default RazorpayPayment;

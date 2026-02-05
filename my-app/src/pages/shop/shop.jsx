import { useEffect } from "react";
import "./shop.css";
import Header from "../Home/components/Header1";
import ShopContent from "./ShopContent";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
const Shop = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    if (!token) {
      navigate('/login');
    } else {
      try {
        const decode = jwtDecode(token);
        const currTime = Date.now() / 1000;
        console.log(decode.exp /1000);
        if (decode.exp < currTime) {
          localStorage.removeItem("token");
          navigate("login");
        } else {
          console.log("Valid Token :",token);
        }
        console.log(decode);
      } catch (e) {
        console.log("Error in decoding token in home page : ", e);
        localStorage.removeItem("token");
        navigate("/login");
      }
    }
    // console.log(role);
    if (role === "admin") {
      navigate("/login");
    }
    // console.log(token);
  },[navigate])
  return (
    <div className="Shop">
      <Header />
      <div  className="shopContent" style={{ paddingTop: "130px" }}>
        <ShopContent />
      </div>
    </div>
  );
};

export default Shop;

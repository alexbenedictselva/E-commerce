import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Sales1.css";
import { useNavigate } from "react-router-dom";
import PopUp from "../../pop-up/popUp";

const SalesBox = ({ name, brand, cost, img, id }) => {
  const [popUp, setPop] = useState("");

  const [errorTimestamp, setErrorTimestamp] = useState(null);
  const navigate = useNavigate();
  const GiveIdToBackEnd = async (e, id) => {
    // e.
    e.stopPropagation();

    try {
      const tokenID = localStorage.getItem("token");
      console.log(tokenID);
      const Res = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/addToCart`,
        {
          id,
        },
        {
          headers: {
            Authorization: `Bearer ${tokenID}`,
          },
        }
      );
      if (Res.status === 200) {
        if (Res.data.message === "Already added") {
          // setPop("Already added");
          setPop("Already added");
          setErrorTimestamp(Date.now());
        } else {
          setPop("Added to cart");
          setErrorTimestamp(Date.now());
        }
      }
    } catch (e) {
      console.log("Error in Giving product id to the backend", e);
    }
  };
  const dispProduct = () => {
    navigate(`/product/${id}`);
    window.location.reload();
  };
  return (
    <div onClick={dispProduct} id="sales-box">
      <div className="pro1">
        <img src={img} alt="no img" />
        <div class="des">
          <span>{brand}</span>
          <h5>{name}</h5>
          <div class="star">
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
          </div>
          <h4>{cost}$</h4>
        </div>
        <i
          className="fal fa-shopping-cart cart1"
          onClick={(e) => GiveIdToBackEnd(e, id)}
        ></i>
        {popUp && (
          <PopUp
            message={popUp}
            key={`${popUp}-${errorTimestamp}`}
            onClose={() => setPop("")}
          />
        )}
      </div>
    </div>
  );
};

export default SalesBox;

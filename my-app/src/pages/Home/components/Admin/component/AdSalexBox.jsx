import React from "react";
import "../../Sales1.css";
import { useNavigate } from "react-router-dom";
// import PopUp from "../../pop-up/popUp";

const AdSales = ({ name, brand, cost, img, id }) => {
  const navigate = useNavigate();
  //   const GiveIdToBackEnd = async (e, id) => {
  //     // e.
  //     e.stopPropagation();

  //     try {
  //       const tokenID = localStorage.getItem("token");
  //       console.log(tokenID);
  //       const Res = await axios.post(
  //         "http://localhost:5000/api/addToCart",
  //         {
  //           id,
  //         },
  //         {
  //           headers: {
  //             Authorization: `Bearer ${tokenID}`,
  //           },
  //         }
  //       );
  //       if (Res.status === 200) {
  //         if (Res.data.message === "Already added") {
  //           // setPop("Already added");
  //           setPop("Already added");
  //           setErrorTimestamp(Date.now());
  //         } else {
  //           setPop("Added to cart");
  //           setErrorTimestamp(Date.now());
  //         }
  //       }
  //     } catch (e) {
  //       console.log("Error in Giving product id to the backend", e);
  //     }
  //   };
  const dispProduct = () => {
    navigate(`/admin/product/${id}`);
    window.location.reload();
  };
  return (
    <div onClick={dispProduct}>
      <div>
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
      </div>
    </div>
  );
};

export default AdSales;

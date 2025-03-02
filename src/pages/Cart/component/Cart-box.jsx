import React, { useEffect, useState } from "react";
import axios from "axios";

import "../CartBox.css";
import { useNavigate } from "react-router-dom";
const CartBox = ({
  name,
  brand,
  cost,
  img,
  quantity,
  id,
  prod,
  setProd,
  ProdId,
  setProduc,
  flagToShow
}) => {
  const [quantityProd, setQuantity] = useState(quantity);
  const tokenId = localStorage.getItem("jwtToken");
  const navigate = useNavigate();
  useEffect(() => {
    const changeQuanity = async () => {
      const itemsChange = axios.post(
        "http://localhost:5000/api/alter",
        {
          quantityProd: quantityProd,
          prodId: id,
        },
        {
          headers: {
            Authorization: `Bearer ${tokenId}`,
          },
        }
      );
    };
    changeQuanity();
  }, [quantityProd]);
  const MinusClicked = (e) => {
    e.stopPropagation();
    if (quantityProd === 1) {
      handleDelete(id);
    }
    quantityProd !== 0 ? setQuantity(quantityProd - 1) : setQuantity(0);
  };
  const PlusClicked = (e) => {
    e.stopPropagation();
    setQuantity(quantityProd + 1);
  };

  const handleDelete = (e, id) => {
    e.stopPropagation();
    setProd(prod.filter((e) => e._id !== id));
    const delProduct = async (req, res) => {
      const tokenId = localStorage.getItem("jwtToken");
      try {
        const PassID = await axios.put(
          "http://localhost:5000/api/deleteCart",
          {
            prodId: id,
          },
          {
            headers: {
              Authorization: `bearer ${tokenId}`,
            },
          }
        );
      } catch (e) {
        console.log("Error in deleting item (FE): ", e);
      }
    };
    delProduct();
  };
  const AddCart = () => {
    // navigate(`/product/${ProdId}`);
    const item = {
      name: name,
      price: cost,
      count: 1,
      image: img,
    };
    console.log("Item-name : ", name);
    setProduc(item);
  };
  const getProductItem = (e) => {
    e.stopPropagation();
    navigate(`/product/${ProdId}`);
  }
  return (
    <div className="CartBox ">
      {/* <div className="pro"> */}
      {flagToShow === 'selected' && (<i class="fa fa-check tick" aria-hidden="true"></i>)}
        <div onClick={AddCart}>
          <img src={img} alt="no img" />
          <div className="items">
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
            <div className="cartQuantity">
              {/* <p>
                <span className="alter" onClick={(e) => MinusClicked(e)}>
                  &#x2D;
                </span>{" "}
                <span className="quan">{quantityProd}</span>{" "}
                <span className="alter" onClick={(e) => PlusClicked(e)}>
                  &#x2B;
                </span>
              </p> */}
            <div className="viewEle" onClick={(e) => getProductItem(e)}><button className="viewProd">View</button></div>
              <div className="del" onClick={(e) => handleDelete(e, id)}>
                <i class="fa fa-trash" aria-hidden="true"></i>
              </div>
            </div>
          </div>
        </div>
      {/* </div> */}
    </div>
  );
};

export default CartBox;

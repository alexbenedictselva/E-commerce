import React, { useEffect, useState } from "react";
import "./AdProdContent.css";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import DeletePop_up from "../../../pop-up/DeletePop_up";
const AdProdContent = () => {
  const [prod, setProd] = useState([]);
  const { id } = useParams();
  const [del, SetDel] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    const getProdDetails = async () => {
      try {
        // console.log("ID : ", id);
        const ProdDetails = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/getProd/${id}`
        );
        setProd(ProdDetails.data.message);
      } catch (e) {
        console.log("Error in displaying product details : ", e);
      }
    };
    getProdDetails();
  }, []);
  useEffect(() => {
    const containsTag = ["male", "female", "boy", "girl", "default"];
    const tagItems = prod?.tags || [];
    const item = tagItems.find((e) => {
      return containsTag.includes(e);
    });
    setItems(item);
  }, [prod]);
  const confirmDel = () => {
    SetDel(!del);
  };

  const GiveToCart = async () => {
    const token = localStorage.getItem("token");
    try {
      const giveToCart = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/addToCart`,
        {
          id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (giveToCart.status === 200) {
        alert("added to cart");
      }
    } catch (e) {
      console.log("Error in adding to cart (Product page) : ", e);
    }
  };
  const UpdateDetils = () => {
    navigate(`/admin/update/${id}`);
    window.location.reload();
  };
  const getProductSimi = (id1) => {
    navigate(`/product/${id1}`);
    window.location.reload();
  };
  return (
    <div id="MainProd">
      <div id="ProdContent">
        <div className="left-side">
          <div className="contentArea alice">
            <img className="mainImg" src={prod.image} alt="no img" />
            <div className="buttons">
              <button onClick={UpdateDetils}>
                {" "}
                <i className="fa-solid fa-psen"></i>&nbsp;&nbsp;Update Product
              </button>
              <button className="del" onClick={confirmDel}>
                {" "}
                <i class="fa-solid fa-erase " aria-hidden="true"></i>
                &nbsp;&nbsp; Delete Product
              </button>
            </div>
            <hr className="line" />
          </div>
        </div>
        {del && (
          <div className="popup-overlay">
            <div className="popup-box">
              <DeletePop_up product={prod.product} SetDel={SetDel} del={del} />
            </div>
          </div>
        )}
        <div className="right-side">
          <div className="content">
            <div className="top">
              <p className="name">{prod.product}</p>
              <p className="amt">
                <span className="fare">{prod.price}$</span> onwards
              </p>
              <div className="rating">
                <div className="rate">
                  <div>
                    <p>
                      <span>4.0</span>
                    </p>
                  </div>
                  <div>
                    <i class="fas fa-star"></i>
                  </div>
                </div>
                <p className="p">8766 Rating,2706 Reviews *</p>
              </div>
              <p className="deliv">Free Delivary</p>
            </div>
            <div className="mid">
              <div className="size">
                <div className="center">
                  <h1>Select Size</h1>
                </div>
                <div className="sizes">
                  <div className="size">
                    <div>
                      <p>XXS</p>
                    </div>
                    <div className="cost">
                      <p className="cost">$100</p>
                    </div>
                  </div>
                  <div className="size">
                    <div>
                      <p>S</p>
                    </div>
                    <div className="cost">
                      <p className="cost">$100</p>
                    </div>
                  </div>
                  <div className="size">
                    <div>
                      <p>M</p>
                    </div>
                    <div className="cost">
                      <p className="cost">$100</p>
                    </div>
                  </div>
                  <div className="size">
                    <div>
                      <p>L</p>
                    </div>
                    <div className="cost">
                      <p className="cost">$100</p>
                    </div>
                  </div>
                  <div className="size">
                    <div>
                      <p>XL</p>
                    </div>
                    <div className="cost">
                      <p className="cost">$100</p>
                    </div>
                  </div>
                  <div className="size">
                    <div>
                      <p>XXL</p>
                    </div>
                    <div className="cost">
                      <p className="cost">$100</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="bot">
              <div className="center">
                <h1>Product Details</h1>
              </div>
              <div className="contentDetails">
                <p className="">Name : {prod.product}</p>
                <p className="">Fabric : Polyester</p>
                <p className="">Sleeve Length : Long Sleeves</p>
                <p className="">Pattern : Self-Design</p>
                <p className="">Net Quantity (N) : 1</p>
                <p className="">Sizes : </p>
                <p className="sizess">
                  XXS, S (Chest Size : 36 in, Length Size: 27 in)
                </p>
                <p className="sizess">
                  M (Chest Size : 38 in, Length Size: 28 in)
                </p>
                <p className="sizess">
                  L (Chest Size : 40 in, Length Size: 29 in)
                </p>
                <p className="sizess">
                  XL (Chest Size : 42 in, Length Size: 29 in)
                </p>
                <p className="sizess">
                  XXL (Chest Size : 44 in, Length Size: 30 in)
                </p>
                {/* <p className="">Sizes :  </p> */}
              </div>
            </div>
            <div className="rating"></div>
          </div>
        </div>
      </div>
      {/* <div className="simiProd">
        <div>
          <h1>People also viewed</h1>
        </div>
        <div className="disp-similar">
          {similarProd.length > 0 &&
            similarProd.map((e) => {
              return (
                <div className="pro">
                  <SalesBox
                    name={e.product}
                    brand="adidas"
                    cost={e.price}
                    img={e.image}
                    id={e._id}
                  />
                </div>
              );
              //   console.log(e.product);
            })}
        </div>
      </div> */}
    </div>
  );
};

export default AdProdContent;

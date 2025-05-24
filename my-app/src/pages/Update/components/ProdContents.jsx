import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "./ProdContent.css";
const ProdContents = () => {
  const [prod, setProd] = useState([]);
  const [Acc, setAcc] = useState(Array(5).fill(true));
  const { id } = useParams();
  useEffect(() => {
    const getProdDetails = async () => {
      try {
        const ProdDetails = await axios.get(
          `http://localhost:5000/api/getProd/${id}`
        );
        setProd(ProdDetails.data.message);
      } catch (e) {
        console.log("Error in displaying product details : ", e);
      }
    };
    getProdDetails();
  }, []);
  const accessable = (ind) => {
    setAcc((prev) => {
      const val = [...prev];
      val[ind] = !val[ind];
      return val;
    });
  };
  return (
    <div id="MainProd">
      <div id="ProdContent">
        <div className="left-side">
          <div className="contentArea alice">
            <img className="mainImg" src={prod.image} alt="no img" />
            <div></div>
          </div>
        </div>
        <div className="right-side">
          <div className="content">
            {/* <div className="top">
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
                <p className="">Sizes :  </p>
              </div>
            </div>
            <div className="rating"></div> */}
            <div className="detailsBox">
              <div className="textBox">
                <p style={{ paddingRight: "54px" }}>Name : </p>
                <div className="cen">
                  <div class="input-wrapper">
                    <input
                      type="text"
                      disabled={Acc[0]}
                      style={
                        Acc[0] ? { backgroundColor: "rgb(245, 241, 241)" } : {}
                      }
                      value={prod.product}
                    />
                    <i class="fas fa-pen" onClick={() => accessable(0)}></i>{" "}
                  </div>
                </div>
              </div>
              <div className="textBox">
                <p style={{ paddingRight: "20px" }}>Category : </p>
                <div className="cen">
                  <div class="input-wrapper">
                    <input
                      type="text"
                      disabled={Acc[1]}
                      style={
                        Acc[1] ? { backgroundColor: "rgb(245, 241, 241)" } : {}
                      }
                      value={prod.category}
                    />
                    <i class="fas fa-pen" onClick={() => accessable(1)}></i>{" "}
                  </div>
                </div>
              </div>
              <div className="textBox">
                <p style={{ paddingRight: "63px" }}>Price : </p>
                <div className="cen">
                  <div class="input-wrapper">
                    <input
                      type="text"
                      disabled={Acc[2]}
                      style={
                        Acc[2] ? { backgroundColor: "rgb(245, 241, 241)" } : {}
                      }
                      value={prod.price}
                    />
                    <i class="fas fa-pen" onClick={() => accessable(2)}></i>{" "}
                  </div>
                </div>
              </div>
              <div className="textBox">
                <p style={{ paddingRight: "58px" }}>Stock : </p>
                <div className="cen">
                  <div class="input-wrapper">
                    <input
                      type="text"
                      disabled={!Acc[3]}
                      style={
                        Acc[3] ? { backgroundColor: "rgb(245, 241, 241)" } : {}
                      }
                      value={prod.stock}
                      
                    />
                    <i class="fas fa-pen" onClick={() => accessable(3)}></i>{" "}
                  </div>
                </div>
              </div>
              <div className="textBox">
                <p style={{ paddingRight: "64px" }}>Tags : </p>
                <div className="cen">
                  <div class="input-wrapper">
                    <input
                      type="text"
                      disabled={Acc[4]}
                      style={
                        Acc[4] ? { backgroundColor: "rgb(245, 241, 241)" } : {}
                      }
                      value={prod.tags}
                    />
                    <i class="fas fa-pen" onClick={() => accessable(4)}></i>{" "}
                  </div>
                </div>
              </div>
            </div>
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

export default ProdContents;

import React, { useCallback, useEffect, useState } from "react";
import "../cart.css";
import SalesBox from "./Cart-box";
import axios from "axios";
const CartItem = () => {
  const [prod, setProd] = useState([]);
  const [cartProd, setCart] = useState([]);
  const [totAmt, setAmt] = useState();
  useEffect(() => {
    const FetchData = async () => {
      try {
        const tokenID = localStorage.getItem("jwtToken");
        const getItems = await axios.get("http://localhost:5000/api/cart", {
          headers: {
            Authorization: `Bearer ${tokenID}`,
          },
        });

        setProd(getItems.data.cart);
      } catch (e) {
        console.log("Error in fetcing cart elements : ", e);
      }
    };
    FetchData();
  }, []);
  const setProduc = useCallback(
    (item = {}) => {
      const name = item.name;
      const isPresent = cartProd.find((e) => e.name === name);

      if (isPresent) {
        const updatedCart = cartProd.filter((e) => e.name !== name);
        setCart(updatedCart);
      } else {
        setCart([...cartProd, item]);
      }
    },
    [cartProd]
  );

  useEffect(() => {
    const sum = cartProd.reduce((total, e) => total + e.price * e.count, 0);
    setAmt(sum);
  }, [cartProd]);
  

  const decrementQuan = (name) => {
    const updatedCart = cartProd
      .map((e) => (e.name === name ? { ...e, count: e.count - 1 } : e))
      .filter((e) => e.count > 0);
    console.log("updated : ", updatedCart);
    setCart(updatedCart);
  };
  const incrementQuan = (name) => {
    const updatedCart = cartProd.map((e) => {
      return e.name === name ? { ...e, count: e.count + 1 } : e;
    });
    setCart(updatedCart);
  };
  const getClassName = (name) => {
    const findProduct = cartProd.find((e) => {
      return e.name === name 
    })
    return findProduct ? "selected" : "";
  }
  return (
    <div>
      <div id="product1" className="section-p1">
        <h2>Your Cart</h2>
        <div className="content">
          <div class="pro-container">
            {prod.length > 0 &&
              prod
                .filter((e) => e.productId?.image)
                .map((e) => {
                  return (
                    <div className={`pro ${getClassName(e.productId.product)}`}>
                      {
                        <SalesBox
                          name={e.productId.product}
                          brand="Adidas"
                          cost={e.productId.price}
                          img={e.productId.image}
                          id={e._id}
                          ProdId={e.productId._id}
                          quantity={e.quantity}
                          prod={prod}
                          setProd={setProd}
                          setProduc={setProduc}
                          flagToShow = {getClassName(e.productId.product)}
                        />
                      }
                    </div>
                  );
                })}
          </div>
          <div className="cartAmt">
            <h1>Buy products</h1>
            {cartProd.length === 0 && (
              <div className="emptyCart">
                <p>Select Products to buy !</p>
              </div>
            )}
            {cartProd.length > 0 &&
              cartProd.map((e) => (
                <div className="contentAmt">
                  <div className="items">
                    <img src={e.image} alt="" />
                  </div>
                  <div className="contentDetails">
                    <div>
                      <p>
                        <span className="key">Name :</span>
                        {e.name}
                      </p>
                    </div>
                    <div>
                      <p>
                        <span className="key">price :</span> 100$
                      </p>
                    </div>
                    <div>
                      <p>Free Delivary</p>
                    </div>
                    <div className="cartQuantity1">
                      <p>
                        <span
                          className="alter"
                          onClick={() => decrementQuan(e.name)}
                        >
                          &#x2D;
                        </span>{" "}
                        <span className="quan">{e.count}</span>{" "}
                        <span
                          className="alter"
                          onClick={() => incrementQuan(e.name)}
                        >
                          &#x2B;
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
              ))}
          
            {cartProd.length > 0 && (
              <div className="totPrice">
                <p>Total price : <span>{totAmt} $ </span></p>
              </div>
            )}
            {cartProd.length > 0 && (
              <div className="buy-div">
                <button className="buy-button">
                  <i class="fa fa-shopping-bag" aria-hidden="true"></i>
                  Buy Product
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;

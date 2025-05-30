import React, { useEffect, useState } from "react";
import "./ProductElements.css";
import Address from "./Address";
import { useLocation } from "react-router-dom";
const ProductElements = () => {
  const [address, setAddress] = useState(false);
  const [cart, setCart] = useState([]);
  const [tot, setTot] = useState();
  const location = useLocation();
  useEffect(() => {
    const items = location.state;
    setCart(items.cart);
  }, []);
  useEffect(() => {
    if (cart.length > 0) {
      const totalPrice = cart.reduce((acc, item) => {
        return acc + item.price * item.count;
      }, 0);
      setTot(totalPrice);
    }
  }, [cart]);
  return (
    <div className="ProdustElements">
      <div id="productElement" className={address === true ? "opacity" : ""}>
        <div className="leftSide">
          <h3>Product Details</h3>
          {cart.length > 0 &&
            cart.map((e) => {
              return (
                <section className="ProdDetails">
                  <div className="Prodcontents">
                    <img src={e.image} alt="no img" />
                  </div>
                  <div className="ProdElement">
                    <p className="prodname">{e.name}</p>
                    <p className="price">{e.price}$</p>
                    <p className="guar">All issue easy returns</p>
                    <div className="size">
                      <p className="size1">Size: Free Size</p>
                      <p className="size1">Qty:{e.count}</p>
                    </div>
                  </div>
                </section>
              );
            })}
        </div>

        <div className="rightSide">
          <section className="checkOutDetails">
            <div className="vl"></div>
            <div className="details">
              <p className="PriDetails">Price Details({cart.length} Item)</p>
              {cart.length > 0 &&
                cart.map((e) => {
                  return (
                    <div className="space">
                      <div>
                        <p className="rate">{e.name}</p>
                      </div>
                      <div>
                        <p className="rate">{e.price}$</p>
                      </div>
                    </div>
                  );
                })}
              <hr />
              <div className="space fin">
                <p className="rateF">Final Price</p>
                <p className="rate">{tot}$</p>
              </div>
              <button className="button" onClick={() => setAddress(!address)}>
                Add Delivary Address
              </button>
            </div>
          </section>
        </div>
      </div>
      {address && (
        <div className="ProdustElementsAbs">
          <Address address={address} setAddress={setAddress} />
        </div>
      )}
    </div>
  );
};

export default ProductElements;

import React, { useEffect, useState } from "react";
import "./ProductElements.css";
import Address from "./Address";
import { useLocation } from "react-router-dom";
import axios from "axios";
import RazorpayPayment from "../../payments/components/RazorpayPayment";

const ProductElements = () => {
  const [address, setAddress] = useState(false);
  const [cart, setCart] = useState([]);
  const [tot, setTot] = useState();
  const [userAddresses, setUserAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const location = useLocation();
  
  useEffect(() => {
    const items = location.state;
    setCart(items.cart);
  }, [location.state]);
  
  useEffect(() => {
    if (cart.length > 0) {
      const totalPrice = cart.reduce((acc, item) => {
        return acc + item.price * item.count;
      }, 0);
      setTot(totalPrice);
    }
  }, [cart]);

  useEffect(() => {
    const fetchAddresses = async () => {
      const token = localStorage.getItem("token");
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/user/addresses`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setUserAddresses(response.data.addresses);
      } catch (e) {
        console.log("Error fetching addresses:", e);
      }
    };
    fetchAddresses();
  }, []);
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
              
              {userAddresses.length > 0 && (
                <div className="address-selection">
                  <p className="address-title">Select Address:</p>
                  <div className="address-list">
                    {userAddresses.map((addr, index) => (
                      <div 
                        key={index} 
                        className={`address-row ${selectedAddress === index ? 'selected' : ''}`}
                        onClick={() => setSelectedAddress(selectedAddress === index ? null : index)}
                      >
                        <p><strong>{addr.name}</strong> - {addr.houseNo}, {addr.roadName}, {addr.city}, {addr.state} - {addr.pincode}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              <div className="button-row">
                <button className="button" onClick={() => setAddress(!address)}>
                  Add Delivary Address
                </button>
                <RazorpayPayment 
                  amount={tot}
                  disabled={selectedAddress === null}
                  userInfo={selectedAddress !== null ? userAddresses[selectedAddress] : null}
                />
              </div>
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

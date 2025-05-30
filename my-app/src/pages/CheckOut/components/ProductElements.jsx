import React, { useState } from "react";
import "./ProductElements.css";
import Address from "./Address";
const ProductElements = () => {
  const [address, setAddress] = useState(false);
  return (
    <div className="ProdustElements">
      <div id="productElement" className={address === true ? "opacity" : ""}>
        <div className="leftSide">
          <h3>Product Details</h3>
          <section className="ProdDetails">
            <div className="Prodcontents">
              <img
                src="https://res.cloudinary.com/dni5usgip/image/upload/v1748587586/ecommerce-images/o4wvxurbincyxlpi4fxg.jpg"
                alt="no img"
              />
            </div>
            <div className="ProdElement">
              <p className="prodname">Product Name</p>
              <p className="price">102$</p>
              <p className="guar">All issue easy returns</p>
              <div className="size">
                <p className="size1">Size: Free Size</p>
                <p className="size1">Qty:1</p>
              </div>
            </div>
          </section>
        </div>

        <div className="rightSide">
          <section className="checkOutDetails">
            <div className="vl"></div>
            <div className="details">
              <p>Price Details(1 Item)</p>
              <div className="space">
                <div>
                  <p className="rate">product name</p>
                </div>
                <div>
                  <p className="rate">+102$</p>
                </div>
              </div>
              <hr />
              <div className="space">
                <p className="rateF">Final Price</p>
                <p className="rate">+102$</p>
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

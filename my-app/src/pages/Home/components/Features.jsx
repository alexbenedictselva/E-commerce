import React from "react";
import "./Features.css";
import img1 from "../../image/f1.png";
import img2 from "../../image/f2.png";
import img3 from "../../image/f3.png";
import img4 from "../../image/f4.png";
import img5 from "../../image/f5.png";

const Features = () => {
  return (
    <div>
      <section id="features" class="section-p1">
        <div class="fe-box">
          <img src={img1} alt="Feature 1" />

          <h6>Free Shipping</h6>
        </div>
        <div class="fe-box">
          <img src={img2} alt="Feature 1" />
          <h6>Online Order</h6>
        </div>
        <div class="fe-box">
          <img src={img3} alt="Feature 1" />
          <h6>Save Money</h6>
        </div>
        <div class="fe-box">
          <img src={img4} alt="Feature 1" />
          <h6>Promotions</h6>
        </div>
        <div class="fe-box">
          <img src={img5} alt="Feature 1" />
          <h6>Happy Sell</h6>
        </div>
      </section>
    </div>
  );
};

export default Features;

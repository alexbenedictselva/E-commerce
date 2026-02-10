import React from "react";
import './Hero.css';
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate();

  return (
    <div>
      <section class="hero">
        <h4 class="s1">Trade-in-offer</h4>
        <h2 class="s2">Super value deals</h2>
        <h1 class="s3">On all products</h1>
        <p class="s4">Save more with coupons & up to 70% off!</p>
        <button class="but" onClick={() => navigate('/shop')}>Shop Now</button>
      </section>
    </div>
  );
};

export default Hero;

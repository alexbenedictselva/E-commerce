import React from 'react'
import './Banner2.css';
import { useNavigate } from 'react-router-dom';

const Banner2 = () => {
  const navigate = useNavigate();

  return (
    <section id="sm-banner" class="section-p1"> 
        <div class="banner-box">
            <h4>Crazy deals</h4>
            <h2>Buy 1 Get 1</h2>
            <span>The best classic dress is on sale at ABS</span>
            <button class="white">Learn More</button>
        </div>
        <div class="banner-box banner-box1">
            <h4>Spring / Summer Sale</h4>
            <h2>Upcomming Seasons</h2>
            <span>The best classic dress is on sale at ABS</span>
            <button class="white" onClick={() => navigate('/shop')}>See Collections</button>
        </div>
    </section>
  )
}

export default Banner2

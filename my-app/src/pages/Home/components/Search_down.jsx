import React from 'react'
import './Search_down.css';
import { useNavigate } from 'react-router-dom';

const Search_down = () => {
  const navigate = useNavigate();

  return (
    <div>
      <section id="search" class="section-m1">
        <div class="news">
            <h4>Sign up unveal offers</h4>
            <p>Sign up to get <span>    Offerr details</span> </p>
        </div>
        <div class="log_in">
            <input type="text" placeholder="Enter your email address" />
            <button class="normal" onClick={() => navigate('/login')}>Sign-up</button>
        </div>
    </section>
    </div>
  )
}

export default Search_down

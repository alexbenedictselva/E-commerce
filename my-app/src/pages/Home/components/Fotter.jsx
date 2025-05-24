import React from "react";
import './Fotter.css';
import app from '../../image/payment/app.jpg';
import play from '../../image/payment/play.jpg'
import pay from '../../image/payment/pay.png'
const Fotter = () => {
  return (
    <div id="fotter">
    <div class="col">
        <img src="" alt="" />
        <h4>Contact</h4>
        <p>
            <strong>Address :</strong> SKCET BK Pudur, <br />
            Kuniyamuthur
        </p>
        <p>
            <strong>Timings: </strong> 10:00 - 18:00, Mon - Sat
        </p>
        <div class="follow">
            <h4>Follow us</h4>
            <div class="icon">
                <i class="fab fa-facebook-f" id="fb"></i>
                <i class="fab fa-twitter" id="tw"></i>
                <i class="fab fa-instagram" id="in"></i>
                <i class="fab fa-pinterest-p" id="pi"></i>
                <i class="fab fa-youtube"></i>
            </div>
        </div>
    </div>

    <div class="col">
        <h4>About</h4>
        <p>About us</p>
        <p>Delivery Information</p>
        <p>Privacy Policy</p>
        <p>Terms & Conditions</p>
        <p>Contact Us</p>
    </div>

    <div class="col pc">
        <h4>My Account</h4>
        <p>Sign In</p>
        <p>View Cart</p>
        <p>My Wishlist</p>
        <p>Track my order</p>
        <p>Help</p>
    </div>

    <div class="col install pc">
        <h4>Install App</h4>
        <p>From App Store or Google Play</p>
        <div class="row">
            <img src={app} alt="" />
                  <img src={play} alt="" />
        </div>
        <p>Secured Payment Gateways</p>
        <img src={pay} alt="" />
    </div>

    {/* <div class="phone">
        <div class="col install">
            <h4>Install App</h4>
            <p>From App Store or Google Play</p>
            <div class="row">
                <img src="img.png/payment/app.jpg" alt="" />
                <img src="img.png/payment/play.jpg" alt="" />
            </div>
            <p>Secured Payment Gateways</p>
            <img src="img.png/payment/pay.png" alt="" />
        </div>

        <div class="col">
            <h4>My Account</h4>
            <p>Sign In</p>
            <p>View Cart</p>
            <p>My Wishlist</p>
            <p>Track my order</p>
            <p>Help</p>
        </div>
    </div> */}
</div>

  );
};

export default Fotter;

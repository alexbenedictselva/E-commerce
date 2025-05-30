import React, { useEffect } from "react";
import "./Address.css";
const Address = ({address,setAddress}) => {
  return (
    <div id="address">
      <div className="content">
        <div className="top">
          <div>
            <i class="fas fa-arrow-left" onClick={() => setAddress(!address)}></i>
          </div>
          <h3 className="heading">Add Delivary address</h3>
        </div>
          <hr />
        <div className="contact">
          <h3 className="subhead">Contact Details</h3>
          <div className="ele">
            <p>Name</p>
            <input type="text" />
          </div>
          <div className="ele lst">
            <p>phone Number</p>
            <input type="number" />
          </div>
        </div>
        <div className="Address">
          <h3 className="subhead">Address</h3>
          <div className="ele">
            <p>House no./Building name</p>
            <input type="text" />
          </div>
          <div className="ele">
            <p>Road Name/ Area</p>
            <input type="text" />
          </div>
          <div className="ele">
            <p>Pincode</p>
            <input type="number" />
          </div>
          <div className="subdiv">
            <div className="ele sub  lst1">
              <p>City</p>
              <input type="text" />
            </div>
            <div className="ele lst lst1 sub">
              <p>State</p>
              <input type="text" />
            </div>
          </div>
        </div>
        <div className="center">
          <button>Update address</button>
        </div>
      </div>
    </div>
  );
};

export default Address;

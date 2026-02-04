import React, { useState } from "react";
import "./Address.css";
import axios from "axios";

const Address = ({address,setAddress}) => {
  const [formData, setFormData] = useState({
    name: "",
    phoneNumber: "",
    houseNo: "",
    roadName: "",
    pincode: "",
    city: "",
    state: ""
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async () => {
    const token = localStorage.getItem("token");
    try {
      await axios.post(
        `${process.env.REACT_APP_API_URL}/api/user/addAddress`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert("Address added successfully");
      setAddress(!address);
    } catch (e) {
      console.log("Error adding address:", e);
    }
  };
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
            <input 
              type="text" 
              name="name"
              value={formData.name}
              onChange={handleInputChange}
            />
          </div>
          <div className="ele lst">
            <p>phone Number</p>
            <input 
              type="text" 
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div className="Address">
          <h3 className="subhead">Address</h3>
          <div className="ele">
            <p>House no./Building name</p>
            <input 
              type="text" 
              name="houseNo"
              value={formData.houseNo}
              onChange={handleInputChange}
            />
          </div>
          <div className="ele">
            <p>Road Name/ Area</p>
            <input 
              type="text" 
              name="roadName"
              value={formData.roadName}
              onChange={handleInputChange}
            />
          </div>
          <div className="ele">
            <p>Pincode</p>
            <input 
              type="text" 
              name="pincode"
              value={formData.pincode}
              onChange={handleInputChange}
            />
          </div>
          <div className="subdiv">
            <div className="ele sub  lst1">
              <p>City</p>
              <input 
                type="text" 
                name="city"
                value={formData.city}
                onChange={handleInputChange}
              />
            </div>
            <div className="ele lst lst1 sub">
              <p>State</p>
              <input 
                type="text" 
                name="state"
                value={formData.state}
                onChange={handleInputChange}
              />
            </div>
          </div>
        </div>
        <div className="center">
          <button onClick={handleSubmit}>Update address</button>
        </div>
      </div>
    </div>
  );
};

export default Address;

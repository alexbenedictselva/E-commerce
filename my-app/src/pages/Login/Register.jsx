import React, { useEffect, useState } from "react";
import "./Login.css";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import PopUp from "../pop-up/popUp";

const Login = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [signState, setSignState] = useState("Sign In");
  const [error1, setError] = useState("");
  const [errorTimestamp, setErrorTimestamp] = useState(null);
  
  const navigate = useNavigate();

  const ChangeState = () => {
    signState === "Sign In" ? setSignState("Sign Up") : setSignState("Sign In");
    if (signState === "Sign In") {
      navigate("/login");
    }
  };
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(email + " " + password);
    let valid = true;
    if (!emailRegex.test(email)) {
      valid = false;
    }
    if (!valid) {
      alert("Error");
      }
      PassDataToBackend();
  };

    const PassDataToBackend = async () => {
        try {
            const Credencials = await axios.post(`${process.env.REACT_APP_API_URL}/api/register`, {
                username: name,
                email: email,
                password: password,
                cart: []
            })
            if (Credencials.status === 200) {
              navigate('/login');
            } else {
              
            }
          } catch (e) {
          if (e.response && e.response.data && e.response.data.message) {
            setError(e.response.data.message);
            setErrorTimestamp(Date.now());

          } 
            console.log("Error in registering user : ",e);
        }
  }
  return (
    <div>
      <div className="login register">
        <div className="box box1">
          <h2 className="signUp font-clr">Sign Up</h2>

          <input
            placeholder="   Username"
            onChange={(e) => setName(e.target.value)}
            className="input1"
          ></input>
          <input
            placeholder="   Email"
            onChange={(e) => setEmail(e.target.value)}
            className="input1"
          ></input>
          <input
            placeholder="   Password"
            onChange={(e) => setPassword(e.target.value)}
          ></input>
          <button className="font-clr" onClick={handleSubmit} type="submit">
            Sign Up
          </button>
          <div className="remember">
            <div className="rem">
              <input type="checkbox"></input>
              <p className="font-clr" >Remember me</p>
            </div>
            <p className="font-clr help" >Need Help ?</p>
          </div>  
          <div className="sign-up">
            <p className="font-clr already">
               Already In Alx?{" "}
              <span className="sign-col" onClick={ChangeState}>
              &nbsp;&nbsp;Sign In Now
              </span>
            </p>
          </div>
        </div>
        {error1 && <PopUp message={error1} flag='0' key={`${error1}-${errorTimestamp}`} onClose={() => setError("")} /> }
      </div>
    </div>
  );
};

export default Login;

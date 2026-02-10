import React, { useState, useEffect } from "react";
import "./Login.css";
// import logo from "../../../assets/logo.png";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [signState, setSignState] = useState("Sign In");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const ADMIN_EMAIL = "admin123@gmail.com";
  const ADMIN_PASSWORD = "admin123";

  useEffect(() => {
    if (location.pathname && location.pathname.includes("register")) {
      setSignState("Sign Up");
    } else {
      setSignState("Sign In");
    }
  }, [location.pathname]);
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(email + " " + password);
    let valid = true;
    if (!emailRegex.test(email)) {
      valid = false;
    }
    if (!valid) {
      alert("error");
    }
    giveDataToBackEnd();
  };
  const giveDataToBackEnd = async () => {
    try {
      const passToBackEnd = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/login`,
        {
          email: email,
          password: password,
        },
      );

      if (passToBackEnd.status === 200) {
        const tokenId = passToBackEnd.data.token;
        const role = passToBackEnd.data.role;
        localStorage.setItem("token", tokenId);
        localStorage.setItem("role", role);

        if (role === "admin") {
          navigate("/admin");
        } else {
          navigate("/");
        }
      } else {
        setError(passToBackEnd.data.message);
        alert(error);
      }
    } catch (e) {
      console.log("Error in passing credencials to the backend : ", e);
    }
  };

  return (
    <div id="Login">
      <div className="login">
        <div className="box">
          <div className="toggle-group">
            <h2 className="font-clr toggle-heading">
              <span
                className={
                  "toggle " + (signState === "Sign In" ? "toggle-active" : "")
                }
                onClick={() => {
                  setSignState("Sign In");
                  navigate("/login");
                }}
              >
                Sign In
              </span>
              <span
                className={
                  "toggle " + (signState === "Sign Up" ? "toggle-active" : "")
                }
                onClick={() => {
                  setSignState("Sign Up");
                  navigate("/register");
                }}
              >
                Sign Up
              </span>
            </h2>
          </div>

          <input
            placeholder="   Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input1"
          ></input>
          <input
            placeholder="   Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></input>
          <button className="font-clr" onClick={handleSubmit} type="submit">
            Sign In
          </button>

          <div className="admin-info">
            <p className="admin-title">Admin Credentials</p>
            <p className="admin-detail">Email: admin123@gmail.com</p>
            <p className="admin-detail">Password: admin123</p>
            <button
              className="fill-admin-btn"
              onClick={(e) => {
                e.preventDefault();
                setEmail(ADMIN_EMAIL);
                setPassword(ADMIN_PASSWORD);
              }}
            >
              Fill Admin
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
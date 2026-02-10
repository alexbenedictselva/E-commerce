import React, { useState, useEffect } from "react";
import "./Login.css";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import PopUp from "../pop-up/popUp";

const Login = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [signState, setSignState] = useState("Sign In");
  const [error1, setError] = useState("");
  const [errorTimestamp, setErrorTimestamp] = useState(null);

  const navigate = useNavigate();
  const location = useLocation();

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
      alert("Error");
    }
    PassDataToBackend();
  };

  const PassDataToBackend = async () => {
    try {
      const Credencials = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/register`,
        {
          username: name,
          email: email,
          password: password,
          cart: [],
        },
      );
      if (Credencials.status === 200) {
        navigate("/login");
      } else {
      }
    } catch (e) {
      if (e.response && e.response.data && e.response.data.message) {
        setError(e.response.data.message);
        setErrorTimestamp(Date.now());
      }
      console.log("Error in registering user : ", e);
    }
  };
  return (
    <div>
      <div className="login register">
        <div className="box box1">
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
        </div>
        {error1 && (
          <PopUp
            message={error1}
            flag="0"
            key={`${error1}-${errorTimestamp}`}
            onClose={() => setError("")}
          />
        )}
      </div>
    </div>
  );
};

export default Login;

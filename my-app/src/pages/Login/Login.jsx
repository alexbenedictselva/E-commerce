import React, { useState } from "react";
import "./Login.css";
// import logo from "../../../assets/logo.png";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [signState, setSignState] = useState("Sign In");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const ChangeState = () => {
    signState === "Sign In" ? setSignState("Sign Up") : setSignState("Sign In");
    if (signState === "Sign In") {
      navigate("/register");
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
      alert("error");
    }
    giveDataToBackEnd();
  };
  const giveDataToBackEnd = async () => {
    try {
      const passToBackEnd = await axios.post(
        "http://localhost:5000/api/login",
        {
          email: email,
          password: password,
        }
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
          <h2 className="font-clr">{signState}</h2>

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
            Sign In
          </button>
          <div className="remember">
            <div className="rem">
              <input type="checkbox"></input>
              <p className="font-clr">Remember me</p>
            </div>
            <p className="font-clr help">Need Help ?</p>
          </div>
          <div className="sign-up font-clr">
            {signState === "Sign In" && (
              <p className="font-clr">
                New to Abs?{" "}
                <span className="sign-col" onClick={ChangeState}>
                  Sign Up Now
                </span>
              </p>
            )}
            {signState === "Sign Up" && (
              <p className="font-clr">
                Already In Alx ?{" "}
                <span className="sign-col" onClick={ChangeState}>
                  Sign In Now
                </span>
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

import React, { useState, useEffect } from "react";
import "./SignInPage.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import BankImg from "../../Bank images/icin_logo1.png";
import { useToasts } from "react-toast-notifications";
function SignInPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [info1, setInfo] = useState("falsed");
  localStorage.removeItem("sign")
  const { addToast } = useToasts();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const config = { headers: { "Content-Type": "application/json" } };
      const res = await axios.post(
        "http://localhost:4000/api/v1/login",
        { email, password },
        config
      );


      if(res.data.user.role == "user"){
        navigate("/dashboard");
      }
      else{
        navigate("/admin-dashboard")
      }
      
      localStorage.setItem(
        "obb",
        JSON.stringify(res.data.user._id + "," + res.data.token+ "," + res.data.user.role)
      );
     
      
      addToast("Logged in successfully", { appearance: "success" });
    
      const y = JSON.parse(localStorage.getItem("obb")).split(",");
      
    } catch (err) {
     
      addToast(err.response.data.error, { appearance: "error" });
    }
  };

  return (
    <div>
      <div className="main-container">
        <div className="imageContainer">
          <img src={BankImg} alt="banking image" width="100%" height="100%" />
        </div>
        <div className="submainContainer">
          <div className="container">
            <div className="sub-container11">
              <p className="p1">WELCOME BACK !</p>
              <p className="p2">
                Don't have an account,{" "}
                <strong>
                  <Link
                    style={{ color: "#8699DA", textDecoration: "none" }}
                    to={"/signup"}
                  >
                    Sign Up
                  </Link>{" "}
                </strong>
              </p>
            </div>
          </div>
          <div className="container">
            <div className="sub-container2-username">Email<span style={{color:"red"}}>*</span></div>
            <div className="sub-container2">
              <input
                className="input"
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="user@gmail.com"
              />
            </div>

            <div className="sub-container2-password">Password<span style={{color:"red"}}>*</span></div>
            <div className="sub-container2">
              <input
                className="input"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="* * * * * * * "
              />
            </div>
          </div>
          <div className="container">
            <div className="container3">
              <div className="forget-password">
                <Link
                  to={"/forgetpassword"}
                  style={{ color: "#8699DA", textDecoration: "none" }}
                >
                  Forget Password?
                </Link>
              </div>
            </div>
          </div>
          <div className="container">
            <div className="btn-container4">
              <button
                style={{ width: "100%", height: "100%" }}
                onClick={handleSubmit}
              >
                Sign In
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignInPage;

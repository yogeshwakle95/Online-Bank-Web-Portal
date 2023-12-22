import React, { useState } from "react";
import "./ForgetPassword.css";
import axios from "axios";
import BankImg from "../../Bank images/icin_logo1.png"
import { useToasts } from "react-toast-notifications";


const ForgetPassword = () => {
  const [email, setEmail] = useState("");
  const { addToast } = useToasts();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const config = { headers: { "Content-Type": "application/json" } };
      const res = await axios.post(
        "http://localhost:4000/api/v1/password/forgot",
        { email },
        config
      );
      addToast(res.data.message, { appearance: "success" });
      // console.log(res.data.message);
    } catch (err) {
      // console.log(err);
      // alert("Invalid EmailID");
      
      addToast(err.response.data.error, { appearance: "error" });
      // console.log(err.response.data.error); 
    }
  };

  return (
    <div>
      <div className="main-container21">
        <div className="imgContainer21">
        <img src={BankImg} alt="banking image"  width="100%" height="100%" />
        </div>
        <div className="submaincontainer21">
        <div className="container21">
          <div className="sub-container21">
            <p className="p21">Forget Password</p>
          </div>
        </div>

        <div className="container21">
          <div className="sub-container21-email">Email ID:</div>
          <div className="sub-container21">
            <input
              className="input21"
              placeholder="Enter your Email ID"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>

        <div className="container21">
          <div className="btn-container21">
            <button
              style={{ width: "100%", height: "100%" }}
              onClick={handleSubmit}
            >
              Send Mail
            </button>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default ForgetPassword;

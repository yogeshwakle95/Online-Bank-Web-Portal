import axios from "axios";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import "./ResetPassword.css";
import { useNavigate } from "react-router-dom";
import BankImg from "../../Bank images/icin_logo1.png";
import { useToasts } from "react-toast-notifications";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();
  const { addToast } = useToasts();
  const match = useParams();
  console.log(password);
  console.log(confirmPassword);
  const handleSubmit = async (e) => {
    try {
      const config = { headers: { "Content-Type": "application/json" } };
      const res = await axios.put(
        `http://localhost:4000/api/v1/password/reset/${match.token}`,
        { password, confirmPassword },
        config
      );
      addToast("Password Updated Successfully", { appearance: "success" });
      navigate("/");
      console.log(res.success);
    } catch (err) {
      console.log(err);
      addToast(err.response.data.error, { appearance: "error" });
    }
  };
  return (
    <div>
      <div className="main-container34">
        <div className="imageContainer12">
          <img src={BankImg} alt="banking image" width="100%" height="100%" />
        </div>
        <div className="submainContainer12">
          <div className="container12">
            <div className="sub-container12">
              <p className="p12">Reset Password</p>
            </div>
          </div>

          <div className="container12">
            <div className="sub-container12-newpassword">New Password</div>

            <div className="sub-container12">
              <input
                className="input12"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter new password"
              />
            </div>

            <div className="sub-container12-confirmpassword">
              Confirm Password
            </div>

            <div className="sub-container12">
              <input
                className="input12"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Enter confirm password"
              />
            </div>
          </div>

          <div className="container">
            <div className="btn-container12">
              <button
                style={{ width: "100%", height: "100%" }}
                onClick={handleSubmit}
              >
                Reset Password
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;

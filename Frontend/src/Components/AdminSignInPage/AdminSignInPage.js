import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./AdminSignInPage.css";

function AdminSignInPage()
{

  return (
    <div>
      <form className="main-container">
        <div className="container">
          <div className="sub-container11">
            <p className="p1">WELCOME BACK !</p>
            <p>
              <Link
                style={{ color: "#8699DA", textDecoration: "none" }}
                to={"/"}
              >
                BACK
              </Link>
            </p>
            <p className="p2">
              If Admin,
              <strong style={{ color: "#8699DA" }}>              
                  {" "} Please log in
              </strong>
            </p>
          </div>
        </div>

        <div className="container">
          <div className="sub-container2-username">Username</div>

          <div className="sub-container2">
            <input
              className="input"
              placeholder="example@email.com"
            />
          </div>

          <div className="sub-container2-password">Password</div>

          <div className="sub-container2">
            <input
              className="input"
              placeholder="* * * * * * * "
            />
            <div className="eye-icon">
              <i className="fa fa-eye-slash"></i>
            </div>
          </div>
        </div>


        <div className="container">
          <div className="btn-container">
            <button style={{ width: "100%", height: "100%" }}>Sign In</button>
          </div>
        </div>
      </form>
    </div>
  );

}
export default AdminSignInPage;

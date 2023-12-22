import React from "react";
import "./BootFooter.css";
import { FaInstagram, FaFacebook, FaTwitter } from "react-icons/fa";
function BootFooter() {
  return (
    <div>
      <div className="BootFooter">
        <h2 style={{ color: "white", fontSize: "10px" }}>All Rights are Reserved</h2>
        <div className="bootfooter-icon-main" >
        <div className="bootfooter-icon-container">
          <FaInstagram style={{ color: "white", fontSize: "30px" }} />

          <FaFacebook style={{ color: "white", fontSize: "30px" }} />
          <FaTwitter style={{ color: "white", fontSize: "30px" }} />
        </div>
        </div>
      </div>
    </div>
  );
}

export default BootFooter;

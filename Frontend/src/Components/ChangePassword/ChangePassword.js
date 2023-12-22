import React,{useEffect, useState} from "react";
import "./ChangePassword.css"
import axios from "axios";
import { useParams } from "react-router-dom";
import { useToasts } from "react-toast-notifications";

const ChangePassword = () => {

  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const { addToast } = useToasts();



  useEffect(() => {
    axios.post("http://localhost:4000/api/v1/login",{email:"rav@gmail.com",password:"987654321"}).then((res)=> console.log(res))
  },[])
  const handleSubmit = async(e) => {
  try{
    const config = { headers: { "Content-Type": "application/json" } };
    const res = await axios.put("http://localhost:4000/api/v1/password/changepassword",{oldPassword,newPassword,confirmPassword},config);
    addToast("Password Updated successfully", { appearance: "success" });

  }
  catch(err){
    addToast(err.response.data.error, { appearance: "error" });

    }
  }

  
  return (
    <div>
      <div className="main-container12">
        <div className="container12">
          <div className="sub-container12">
            <p className="p12">Change Password</p>
          </div>
        </div>

        <div className="container12">
          <div className="sub-container12-oldpassword">Old Password</div>

          <div className="sub-container12">
            <input className="input" type="password" value={oldPassword} onChange={(e)=>setOldPassword(e.target.value)} placeholder="Enter old password" />
          </div>

          <div className="sub-container56-newpassword">New Password</div>

          <div className="sub-container12">
            <input className="input" type="password" value={newPassword} onChange={(e)=>setNewPassword(e.target.value)} placeholder="Enter new password" />
          </div>


          <div className="sub-container56-confirmpassword">Confirm Password</div>

          <div className="sub-container12">
            <input className="input" type="password" value={confirmPassword} onChange={(e)=>setConfirmPassword(e.target.value)} placeholder="Enter confirm password" />
          </div>

        </div>

        <div className="container12">
          <div className="btn-container56">
            <button style={{ width: "100%", height: "100%" }} onClick={handleSubmit}>Change Password</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;

import React from "react";
import { useState } from "react";
import "./Signup.css";
import { useToasts } from "react-toast-notifications";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const SignupFrom = () => {
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const [ferr, setferr] = useState(false);
  const [lerr, setlerr] = useState(false);
  const [merr, setmerr] = useState(false);
  const [eerr, seteerr] = useState(false);
  const [uerr, setuerr] = useState(false);
  const [perr, setperr] = useState(false);
  const [cerr, setcerr] = useState(false);
  const navigate = useNavigate();
  const { addToast } = useToasts();
  let [errMsg, setErrMsg] = useState("");
  let [errMsg2, setErrMsg2] = useState("");
  let [errMsg3, setErrMsg3] = useState("");
  let [errMsg4, setErrMsg4] = useState("");

  
  function firstname(e) {
    let val = e.target.value;
    if (val.length == 0) {
      setferr(true);
    } else {
      setferr(false);
    }
    setFirstName(val);
  }
  function lastname(e) {
    let val = e.target.value;
    if (val.length == 0) {
      setlerr(true);
    } else {
      setlerr(false);
    }
    setLastName(val);
  }

  function user(e) {
    let val = e.target.value;
    if (val.length == 0) {
      setuerr(true);
    } else {
      setuerr(false);
    }
    setUserName(val);
  }

  function emailid(e) {
    let val = e.target.value;
    if (val.length == 0) {
      seteerr(true);
      setErrMsg("Email is required");
    } else if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(val)) {
      seteerr(true);
      setErrMsg("Invalid email");
    } else {
      seteerr(false);
    }
    setEmail(val);
  }

  function phone(e) {
    let val = e.target.value;
    if (val.length == 0) {
      setmerr(true);
      setErrMsg2("Phone no. is required");
    } else if (val.length != 10) {
      setmerr(true);
      setErrMsg2("Invalid phone no.");
    } else {
      setmerr(false);
    }
    setMobile(val);
  }
  function npassword(e) {
    let val = e.target.value;
    if (val.length == 0) {
      setperr(true);
      setErrMsg3("Password is required");
    } else if (val.length < 8) {
      setperr(true);
      setErrMsg3("Password must be longer than 8 characters");
    } else if (val.length >= 20) {
      setperr(true);
      setErrMsg3("Password must shorter than 20 characters");
    } else {
      setperr(false);
    }
    setPassword(val);
  }
  function cpassword(e) {
    let val = e.target.value;
    if (val.length == 0) {
      setcerr(true);
      setErrMsg4("Confirm password is required");
    } else if (val !== password) {
      setcerr(true);
      setErrMsg4("Password does not match");
    } else {
      setcerr(false);
    }
    setConfirmPassword(val);
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios
        .post("http://localhost:4000/api/v1/signup", {
          first_name,
          last_name,
          mobile,
          email,
          username,
          password,
          confirmpassword,
        })
        .then((res) => {
          localStorage.setItem("sign", JSON.stringify(res.data.user._id));
          addToast("Account created Successfully!", {
            appearance: "success",
          });
          navigate("/redirecting");

          const user = JSON.parse(localStorage.getItem("sign"));
        });
    } catch (err) {
      addToast(err.response.data.error, { appearance: "error" });
    }
  };
  return (
    <div className="main-container3456">
      <h1>Sign Up</h1>
      <small>
        Already have a account ?{" "}
        <a href="/" style={{ textDecoration: "none" }}>
          Log in
        </a>
      </small>
      <div className="sub-container3456">
        <form class="row justify-content-evenly needs-validation" novalidate>
          <div class="col-md-5">
            <label for="validationCustom01" class="labels">
              First name<span style={{color:"red"}}>*</span>
            </label>
            <input
              type="text"
              class="form-control"
              onChange={firstname}
              placeholder="Enter your first name"
              id="validationCustom01"
              required
            />
            {ferr ? (
              <span style={{ color: "#D8000C" }}>First name is required</span>
            ) : null}
          </div>
          <div class="col-md-5">
            <label for="validationCustom02" class="labels">
              Last name<span style={{color:"red"}}>*</span>
            </label>
            <input
              type="text"
              class="form-control"
              onChange={lastname}
              placeholder="Enter your last name"
              id="validationCustom02"
              required
            />
            {lerr ? (
              <span style={{ color: "#D8000C" }}>Last name is required</span>
            ) : null}
          </div>

          <div class="mt-2 col-md-5">
            <label for="validationCustom02" class="labels">
              Username<span style={{color:"red"}}>*</span>
            </label>
            <input
              type="text"
              class="form-control"
              onChange={user}
              placeholder="Enter your username"
              id="validationCustom02"
              required
            />
            {uerr ? (
              <span style={{ color: "#D8000C" }}>Username is required</span>
            ) : null}
          </div>

          <div class="mt-2 col-md-5">
            <label for="validationCustom02" class="labels">
              Email<span style={{color:"red"}}>*</span>
            </label>
            <input
              type="text"
              class="form-control"
              onChange={emailid}
              placeholder="Enter your email"
              id="validationCustom02"
              required
            />
            {eerr ? <span style={{ color: "#D8000C" }}>{errMsg}</span> : null}
          </div>

          <div class="mt-2 col-md-5">
            <label for="validationCustom02" class="labels">
              Phone no.<span style={{color:"red"}}>*</span>
            </label>
            <input
              type="number"
              class="form-control"
              onChange={phone}
              id="validationCustom02"
              limit="10"
              placeholder="Enter your phone no."
              required
            />
            {merr ? <span style={{ color: "#D8000C" }}>{errMsg2}</span> : null}
          </div>

          <div class="mt-2 col-md-5">
            <label for="validationCustom02" class="labels">
              Password<span style={{color:"red"}}>*</span>
            </label>
            <input
              type="password"
              class="form-control"
              onChange={npassword}
              id="validationCustom02"
              placeholder="Enter your password"
              required
            />
            {perr ? <span style={{ color: "#D8000C" }}>{errMsg3}</span> : null}
          </div>

          <div class="mt-2 col-md-5">
            <label for="validationCustom02" class="labels">
              Confirm Password<span style={{color:"red"}}>*</span>
            </label>
            <input
              type="password"
              class="form-control"
              onChange={cpassword}
              placeholder="Enter your confirm password"
              id="validationCustom02"
              required
            />
            {cerr ? <span style={{ color: "#D8000C" }}>{errMsg4}</span> : null}
          </div>

          <div class="col-md-5"></div>
          
          <div class="mt-4 col-md-4">
            <div className="btn-container3456">
            <button type="submit" onClick={handleSubmit}>
              Submit
            </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignupFrom;

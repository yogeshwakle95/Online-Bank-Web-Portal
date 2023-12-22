import React, { Component } from "react";

class ValidateForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      empName: '',
      emailId: '',
      dob: '',
      gender: 'select',
      contact: '',
      country: 'select',
      formErrors: {}
    };

    this.initialState = this.state;
  }

  onFormValidation() {
    const { empName, emailId, dob, gender, contact, country } = this.state;
    let formErrors = {};
    let formIsValid = true;

    //Employee name     
    if (!empName) {
      formIsValid = false;
      formErrors["empNameErr"] = "Name is required.";
    }

    //EmailId   
    if (!emailId) {
      formIsValid = false;
      formErrors["emailIdErr"] = "Email id is required.";
    }
    else if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(emailId))) {

      formIsValid = false;
      formErrors["emailIdErr"] = "Invalid email id.";
    }

    //DOB    
    if (!dob) {
      formIsValid = false;
      formErrors["dobErr"] = "DOB is required.";
    }
    else {
      var pattern = /^(0[1-9]|1[0-9]|2[0-9]|3[0-1])\/(0[1-9]|1[0-2])\/([0-9]{4})$/;
      if (!pattern.test(dob)) {
        formIsValid = false;
        formErrors["dobErr"] = "Invalid date of birth";
      }
    }

    //Gender    
    if (gender === '' || gender === "select") {
      formIsValid = false;
      formErrors["genderErr"] = "Select gender.";
    }

    //Contact   
    if (!contact) {
      formIsValid = false;
      formErrors["contactErr"] = "Conatact is required.";
    }
    else {
      var mobPattern = /^(?:(?:\\+|0{0,2})91(\s*[\\-]\s*)?|[0]?)?[789]\d{9}$/;
      if (!mobPattern.test(contact)) {
        formIsValid = false;
        formErrors["contactErr"] = "Invalid Contact number.";
      }
    }

    //country    
    if (country === '' || country === "select") {
      formIsValid = false;
      formErrors["countryErr"] = "Select country.";
    }

    this.setState({ formErrors: formErrors });
    return formIsValid;
  }

  onChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  onSubmit = (e) => {
    e.preventDefault();

    if (this.onFormValidation()) {
      alert('You have been successfully submitted.')
      this.setState(this.initialState)
    }
  }

  render() {

    const { empNameErr, emailIdErr, dobErr, genderErr, contactErr, countryErr } = this.state.formErrors;

    return (
      <div>
        <h3 style={{ textAlign: "center" }} >Employee Information Form </ h3>
        <div>
          <form onSubmit={this.onSubmit}>
            <div>
              <label htmlFor="empName">Name</label>
              <input type="text" name="empName"
                value={this.state.empName}
                onChange={this.onChange}
                placeholder="Your name.."
                className={empNameErr ? ' showError' : ''} />
              {empNameErr &&
                <div style={{ color: "red", paddingBottom: 10 }}>{empNameErr}</div>
              }

            </div>
            <div>
              <label htmlFor="emailId">Email Id</label>
              <input type="text" name="emailId"
                value={this.state.emailId}
                onChange={this.onChange}
                placeholder="Your email id.."
                className={emailIdErr ? ' showError' : ''} />
              {emailIdErr &&
                <div style={{ color: "red", paddingBottom: 10 }}>{emailIdErr}</div>
              }

            </div>
            <div>
              <label htmlFor="text">DOB</label>
              <input type="text" name="dob"
                value={this.state.dob}
                onChange={this.onChange}
                placeholder="DD/MM/YYYY.."
                className={dobErr ? ' showError' : ''} />
              {dobErr &&
                <div style={{ color: "red", paddingBottom: 10 }}>{dobErr}</div>
              }
            </div>
            <div>
              <label htmlFor="gender">Gender</label>
              <select name="gender" onChange={this.onChange}
                className={genderErr ? ' showError' : ''}
                value={this.state.gender} >
                <option value="select">--Select--</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="Other">Other</option>
              </select>
              {genderErr &&
                <div style={{ color: "red", paddingBottom: 10 }}>{genderErr}</div>
              }
            </div>
            <div>
              <label htmlFor="contact">Phone Number</label>
              <input type="text" name="contact"
                onChange={this.onChange}
                value={this.state.contact}
                placeholder="Your phone number.."
                className={contactErr ? ' showError' : ''} />
              {contactErr &&
                <div style={{ color: "red", paddingBottom: 10 }}>{contactErr}</div>
              }
            </div>
            <div>
              <label htmlFor="country">country</label>
              <select name="country"
                value={this.state.country}
                onChange={this.onChange}
                className={countryErr ? ' showError' : ''} >
                <option value="select">--Select--</option>
                <option value="India">India</option>
                <option value="USA">USA</option>
                <option value="UK">UK</option>
              </select>
              {countryErr &&
                <div style={{ color: "red", paddingBottom: 10 }}>{countryErr}</div>
              }
            </div>
            <input type="submit" value="Submit" />
          </form>
        </div>
      </div >
    )
  }
}

export default ValidateForm;
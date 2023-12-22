import React, { useEffect, useState } from 'react'
import BootNavBar from '../BootNavbar/BootNavBar'
import './Profile.css'
import BootFooter from '../Footer/BootFooter'
import axios from 'axios'
import { FaPhoneSquareAlt } from "react-icons/fa";
function Profile() {
  const [data, setData] = useState('')
  const [mobile, setMobile] = useState('')
  const [email, setEmail] = useState('')
  const [editbtn, setEditbtn] = useState(false)
  const [savingaccount, setSavingAccount] = useState('')
  const [primaryaccount, setPrimaryAccount]=useState('')
  const [editFields, setEditFields] = useState("disabled")
  const [userAccountData, setUserAccountData] = useState([]);
  // const [userData,setUserData]= useState('')

  const id = localStorage.getItem("obb")?.split(',')[0]?.split('"')[1]
 
  useEffect(() => {
    
   
        const fetchUser = async () => {
      const response = await axios.get(`http://localhost:4000/api/v1/users/${id}`);
      setData(response.data);
      axios.get(`http://localhost:4000/api/userAccount/`).then((res) => setUserAccountData(res.data)).catch((err) => console.log(err))
      //const response2 = await axios.get(``)
      
    };
    fetchUser();
  }, []);
//console.log(data._id);
const ff = userAccountData.filter((e) => e.userId == id)
const sfiltered = ff.filter(user => user.accounttype =='Savings Account');
const suserId = sfiltered.map(user => user._id);
//console.log(suserId);

const pfiltered = ff.filter(user => user.accounttype =='Primary Account');
const puserId = pfiltered.map(user => user._id);

axios.get(`http://localhost:4000/api/userAccount/id/${puserId}`).then((res) =>  setPrimaryAccount(res.data)).catch((err) => console.log(err))
axios.get(`http://localhost:4000/api/userAccount/id/${suserId}`).then((res) =>  setSavingAccount(res.data)).catch((err) => console.log(err))
//console.log(savingaccount.accountnumber);

  const UpdateProduct = async (event) => {
    event.preventDefault();
    const update={
      email:email,
      mobile:mobile,
     
    }
    
    await axios.put(`http://localhost:4000/api/v1/users/${id}`, update).then((res) => (console.log(res))).catch((err) => console.log(err))
    await axios.get(`http://localhost:4000/api/v1/users/${id}`).then((res)=>setData(res.data))

    setEditbtn(prevState => !prevState)
     setEditFields("enabled")
  };




  return (
    <div>
      <BootNavBar/>
      <div className='profile-container'>
        <div className='divv1'>
          <div className='Profile-head'>
            Profile
          </div>
          <div className='hrdiv' style={{ width: "70%", margin: "0px auto", background: "#8699DA", height: "1px" }}><hr /></div>


          <div className='profile-container2'>
            <div className='profile-form'>
              <div className='profile-username'>
                <div className='profile-label'>Username</div>
                <div className='profile-input'><input value={data.username} disabled /></div>
              </div>
              <div className='profile-firstname'>
                <div className='profile-label'>First Name</div>
                <div className='profile-input'><input value={data.first_name} disabled /></div>
              </div>
              <div className='profile-lastname'>
                <div className='profile-label'>Last Name</div>
                <div className='profile-input'><input value={data.last_name} disabled /></div>
              </div>
              <div className='profile-email'>
                <div className='profile-label'>Email ID</div>
                <div className='profile-input'><input id='ppp' value={editbtn?email:data.email} onChange={e => { setEmail(e.target.value) }} disabled={!editbtn} /></div>
              </div>
              <div className='profile-mobile'>
                <div className='profile-label'>Mobile</div>
                <div className='profile-input'><input value={editbtn?mobile:data.mobile} onChange={e => { setMobile(e.target.value) }} disabled={!editbtn} /></div>
              </div>
              {/* <div className='profile-btn-container'>
                {(!editbtn) && <button onClick={UpdateProduct} >Edit Profile</button>}


                {(editbtn) && <button onClick={UpdateProduct} >Save Profile</button>}
              </div> */}
            </div>
          </div>

        </div>

        <div className='account-info'>
          <div className='acount-info-container'>
            <div className='account-info-head'>Acount Information</div>
            <div className='account-container'>
              <div className='primary-account-container'>
                <div className='account-head'><input value="PRIMARY ACCOUNT NUMBER" disabled /></div>
                <div className="account-number"><input value={primaryaccount.accountnumber} disabled /></div>
              </div>
              <div className='savings-account-container'>
                <div className='account-head'><input value="SAVING ACCOUNT NUMBER" disabled /></div>
                <div className="account-number"><input value={savingaccount.accountnumber} disabled /></div>
              </div>
            </div>
          </div>
        </div>

      </div>
<div style={{position:"absolute",width:"100%",bottom:0}}><BootFooter/></div>
    </div>
  )
}
export default Profile
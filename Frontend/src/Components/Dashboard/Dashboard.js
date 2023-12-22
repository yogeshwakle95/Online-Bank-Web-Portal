import React, { useState,useEffect } from 'react'
import './Dashboard.css'
import BootNavBar from '../BootNavbar/BootNavBar'
import BootFooter from '../Footer/BootFooter'
import { Link, useNavigate } from 'react-router-dom'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import BlockModal from '../BlockModal/BlockModal';
import axios from 'axios';
import { FaArrowCircleRight,FaDollarSign } from "react-icons/fa";
let Dashboard=({modalShow,setModalShow})=> {
  const id = localStorage.getItem("obb")?.split(',')[0]?.split('"')[1]
  const[value1,setValue1] = useState(true)
  const[value2,setValue2] = useState(true)
  const [data,setData] =useState([])
  
  useEffect(()=>{
    axios.get("http://localhost:4000/api/userAccount").then((res)=>setData(res.data.filter((e)=>e.userId == id)))
    
  
},[])

const primary_balance = data.filter((e)=>e.accounttype == "Primary Account")[0]?.amount
const savings_balance = data.filter((e)=>e.accounttype == "Savings Account")[0]?.amount

  return (
    <body>
      <BootNavBar></BootNavBar>
      <BlockModal
        backdrop="static"
        show={modalShow == undefined ? false :JSON.parse(modalShow)}
      />
      <div className='main-container-dashboard'>
      <div className='dashboard-main-container'>
      <div className='dashboard-container'>


<div className='primary-account-container'>
  <div className='account-text'>
    <div className='primary-account-text'>Primary Account</div>
    <div className='show-balance-container'>
      { value1 == true ?<button style={{width:"100%",height:"100%",border:"none",textAlign:"center",fontSize:"20px"}} onClick={()=>setValue1(!value1)}>View Balance <i  id='icons1' className='fas fa-angle-double-down'  style={{fontSize:"20px"}} ></i></button> : <div><FaDollarSign/>{primary_balance !== undefined ? primary_balance:0}</div>}
    </div>
    
  </div>
</div>
<div className='deposit-container'>
  <div className='deposit-text-cotainer'>
    <div className='deposit-text'>
      Deposit
    </div>
    <div className='deposit-icon'>
      <Link to={'/deposit' } className='new-dashboard-link'>
            <i className='fas fa-money-check-alt' style={{fontSize:"70px",textDecoration:"none",color:"black"}}></i>
           
        
      </Link>
    </div>
  </div>
</div>



<div className='savings-account-container'>
<div className='account-text'>
    <div className='savings-account-text'>Savings Account</div>
    <div className='show-balance-container1'>
      { value2 == true ?<button style={{width:"100%",height:"100%",border:"none",textAlign:"center",fontSize:"20px"}} onClick={()=>setValue2(!value2)}>View Balance <i id='icons1'  className='fas fa-angle-double-down'  style={{fontSize:"20px"}} ></i></button> : <div><FaDollarSign/>{savings_balance !== undefined ? savings_balance:0}</div>}
    </div>
  </div>
</div>



<div className='withdrawal-container'>
  <div className='withdrawal-text-cotainer'>
    <div className='withdrawal-text'>
      Withdrawal
    </div>
    <div className='withdrawal-icon'>
      <Link to={'/withdrawl'} className='new-dashboard-link'>
        <i className='fas fa-money-bill-wave' style={{fontSize:"70px",textDecoration:"none",color:"black"}}></i>
       
      </Link>
    </div>
  </div>
    
  </div>
 </div>
      
      
      </div>
      
    </div>
    <BootFooter/>
    </body>
  )
}

export default Dashboard


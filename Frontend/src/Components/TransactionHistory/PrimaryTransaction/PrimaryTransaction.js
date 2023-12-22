import React, { useEffect, useState } from 'react'
import BootNavBar from '../../BootNavbar/BootNavBar'
import {Row,Col} from 'react-bootstrap'
import axios from 'axios'
import { Link } from 'react-router-dom'
import './PrimaryTransaction.css'
import BootFooter from '../../Footer/BootFooter'
import BlockModal from '../../BlockModal/BlockModal';
function PrimaryTransaction({modalShow}) {
  let arr = [
    "Sr No",
    
    "Name",
    "Account No",
    "Amount",
    "Date",
    "Status"

]
const id = localStorage.getItem("obb")?.split(',')[0]?.split('"')[1]
   
const[data,setData] = useState([])
const[userData,setUserData] = useState([])
const[back,setBack] = useState(false)

useEffect(()=>{
  axios.get(`http://localhost:4000/api/users/${id}`).then((res)=>setUserData(res.data.primary_account_number)).catch((err)=>console.log(err))
  axios.get(`http://localhost:4000/api/receip`).then((res)=>setData(res.data)).catch((err)=>console.log(err))
       
},[])

const newData = data.filter((e)=>e.primary_account_number == userData)?.[0]


  return (
    <div>
      <BootNavBar></BootNavBar>
      <BlockModal
        backdrop="static"
        show={modalShow == undefined ? false :JSON.parse(modalShow)}
      />
      <div className='main-container121'>
      <div className='back-btn'><Link to={"/transaction-type"} style={{border:"none",textDecoration:"none",color:"white"}}><i className='fa fa-arrow-left' style={{paddingRight:"5px"}}></i>Back</Link></div>
      <div>
      
      <div className='primaryInfo1'>
    <Row >
    {
        arr.map((e,i)=>(
            <Col style={{border:"1px solid white"}} key={i}>
            <strong>{e}</strong>
            </Col>
        ))
    }
    </Row>
    </div>
    <div className='primary-body' >
       
{
  newData?.transfer_history_primary.length !== 0 ?
  newData?.transfer_history_primary.map((e,i)=>(
   <Row key={i}>
    <Col className='primary-col'>{i+1}</Col>
    <Col className='primary-col'>{e.first_name + " " + e.last_name}</Col>
    <Col className='primary-col'>{e.primary_account_number}</Col>
    <Col className='primary-col'>{e.primary_balance}</Col>
    <Col className='primary-col'>{e.date}</Col>
    <Col className='primary-col'>{e.transfer_status == "true" ?<div style={{color:"green"}}>Confirmed</div>:<div style={{color:"red"}}>Pending...</div>}</Col>

   </Row>
  ))
  :
  "No data"
}


    </div>
      </div>
      </div>
    <BootFooter/>
    </div>
  )
}

export default PrimaryTransaction
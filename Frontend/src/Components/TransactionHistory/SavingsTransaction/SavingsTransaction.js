import React, { useEffect, useState } from 'react'
import BootNavBar from '../../BootNavbar/BootNavBar'
import {Row,Col} from 'react-bootstrap'
import axios from 'axios'
import './SavingsTransaction.css'
import { Link } from 'react-router-dom'
import BootFooter from '../../Footer/BootFooter'
import Pagination from 'react-js-pagination'
import Pages from '../../Pagination/Pagination'
import BlockModal from '../../BlockModal/BlockModal';
function SavingsTransaction({modalShow}) {
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


useEffect(()=>{
  axios.get(`http://localhost:4000/api/users/${id}`).then((res)=>setUserData(res.data.savings_account_number)).catch((err)=>console.log(err))
  axios.get(`http://localhost:4000/api/receip`).then((res)=>setData(res.data)).catch((err)=>console.log(err))
       
},[])

const newData = data.filter((e)=>e.savings_account_number == userData)?.[0]
console.log(newData?.transfer_history_saving.length);
  return (
    <div >
      <BootNavBar></BootNavBar>
      <BlockModal
        backdrop="static"
        show={modalShow == undefined ? false :JSON.parse(modalShow)}
      />
      <div className='main-container121'>
      <div className='back-btn1'><Link to={"/transaction-type"} style={{border:"none",textDecoration:"none",color:"white"}}><i className='fa fa-arrow-left' style={{paddingRight:"5px"}}></i>Back</Link></div>
      <div>

      <div className='savingsInfo1'>
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
    <div className='savings-body' >
       
    {
      newData?.transfer_history_saving.length !== 0 ?
  newData?.transfer_history_saving.map((e,i)=>(
   <Row key={i}>
    <Col className='savings-col'>{i+1}</Col>
    <Col className='savings-col'>{e.first_name + " " + e.last_name}</Col>
    <Col className='savings-col'>{e.savings_account_number}</Col>
    <Col className='savings-col'>{e.savings_balance}</Col>
    <Col className='savings-col'>{e.date}</Col>
    <Col className='savings-col'>{e.transfer_status == "true" ?<div style={{color:"green"}}>Confirmed</div>:<div style={{color:"red"}}>Pending...</div>}</Col>

   </Row>
  ))

  :
  "No data"
}

    </div>
      </div>
      <div><Pages totalRecords = {newData?.transfer_history_saving.length} /></div>
      </div>
    <BootFooter/>
    </div>
  )
}

export default SavingsTransaction
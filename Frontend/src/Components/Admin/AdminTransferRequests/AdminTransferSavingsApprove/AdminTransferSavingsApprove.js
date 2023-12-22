import React,{useState,useEffect} from 'react'
import BootFooter from '../../../Footer/BootFooter'
import AdminNavBar from '../../AdminNavBar/AdminNavBar'
import './AdminTransferSavingsApprove.css'
import AdminModelTransferRequest from '../../AdminModelTransferRequest/AdminModelTransferRequest'
import {Row,Col} from 'react-bootstrap'
import axios from "axios"
import { Link } from 'react-router-dom'
function AdminTransferSavingsApprove() {
  let arr = [
    "Sr No",
    "From",
    "Send-To ",
   
    
    "Action"

]
const [modalShow, setModalShow] = useState(false);
const[data,setData]= useState([])

const[btn,setBtn] = useState(true)
const[modelData,setModalData] = useState()

useEffect(() => {
axios.get("http://localhost:4000/api/receip").then((res)=>setData(res.data)).catch((err)=>console.log(err))

}, [])












let newFun=(e)=>{
    setModalData(e)
    setModalShow(true)
}
  return (
    <div>
        <AdminNavBar/>

<div>

<div className='admin-chequebook-container1111'>
    <div className='btnButton-savings'>
    <Link to={'/admin_transfer_requests'} className='btnButton-savings-link'><i className='fa fa-arrow-left' style={{paddingRight:"5px"}}></i> Back</Link>
        </div>
    <div className='admin-chequebook-heading1111'><h3>Transfer Request - Savings Account - Confirmed</h3></div>
    <div className='admin-chequebook-head1111'>
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
    <br/>
    <div className='admin-chequebook-body1111'>


    { 
data.map((e,i)=>(
    data[i]?.transfer_history_saving.filter((y)=>y.transfer_status == "true").map((j,k)=>(
        <Row className='Rows1' key={k}>
        <Col className='Cols'>{k+1}</Col>
        <Col className='Cols'>{e.savings_account_number?e.savings_account_number:e.primary_account_number} {'\u00A0'}
         <a onClick={() => newFun({Rfirst_name:e.first_name,
                                                              Rlast_name:e.last_name,
                                                              
                                                              Rprimary_account_number:e.primary_account_number,
                                                              
                                                              Rsavings_account_number:e.savings_account_number,
                                                              Ufirst_name:j.first_name,
                                                              Ulast_name:j.last_name,
                                                              Uprimary_account_number:j.primary_account_number,
                                                              Usavings_account_number:j.savings_account_number
                                                              })}> <i className="fa fa-arrow-down" style={{color:"blue",cursor:"pointer"}}></i></a>

         
    
        </Col>
       
        <Col className='Cols'>{j.savings_account_number}</Col>
        
       
        <Col className='Cols'><div style={{color:"green"}}>Confirmed</div></Col>
    </Row> 
    ))
))
}
 










<AdminModelTransferRequest accountinfo={modelData}
                                      show={modalShow} 
                                      onHide={() => setModalShow(false)}/>







   
    

      
    </div>
</div>
    
</div>

        <div style={{position:"absolute",bottom:0,width:"100%"}}>
<BootFooter/>
</div>
    </div>
  )
}

export default AdminTransferSavingsApprove
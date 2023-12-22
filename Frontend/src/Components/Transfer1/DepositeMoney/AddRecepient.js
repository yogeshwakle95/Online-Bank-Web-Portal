import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import './AddRecepient.css'
import BlockModal from '../../BlockModal/BlockModal';

function AddRecepient({modalShow}) {


const [data, setData] = useState([]);

const id = localStorage.getItem("obb")?.split(',')[0]?.split('"')[1]

  const[userData,setUserData] = useState([])
  const[receipData,setReceipData] = useState([])
  const[zdata,setZdata] = useState([])
  const[state,setState] = useState(false)
  const[inputData,setInputData] = useState({
    accountNo:""
  })

  const value = []
  useEffect(()=>{

    //selects signedIn user
    axios.get(`http://localhost:4000/api/v1/users/${id}`)
          .then(res=>setUserData(res.data))
          .catch((err)=>console.log(err))

          
// All user Data
    axios.get(`http://localhost:4000/api/v1/users`)
          .then(res=>setReceipData(res.data.users.filter((e)=>e.primary_account_number === inputData.accountNo || e.savings_account_number == inputData.accountNo)))
          .catch((err)=>console.log(err))
  
  
   
    
  },[])
 





//buttom to add receipients
  let fun=async()=>{
    const post_info = {}
const {first_name,last_name,primary_account_number,savings_account_number,recepients} = userData
// if(receipData.length == 0){
//  post_info = {
//   first_name,
//   last_name,
//   primary_account_number,
//   savings_account_number,

//   recepients:recepients.concat([
//     {

//     }
//   ])

// }
// await  axios.post(`http://localhost:4000/api/recepients`,post_info)
//           .then(res=>console.log(res))
//           .catch((err)=>console.log(err))
// }
// else{
//    post_info = {
//     first_name,
//     last_name,
//     primary_account_number,
//     savings_account_number,
  
//     recepients:recepients.concat([
//       {
  
//       }
//     ])
  
//   }
//   await  axios.post(`http://localhost:4000/api/recepients/${_id}`,post_info)
//           .then(res=>console.log(res))
//           .catch((err)=>console.log(err))
// }
  
  

      
  }
  
  
  let toggle=()=>{
setState(prev => !prev)
  }
  
  
  
  
  
  
  
  
  
   
  
  
  return (
    <div>
      <BlockModal
        backdrop="static"
        show={modalShow == undefined ? false :JSON.parse(modalShow)}
      />
    <div className="addreceipient-main-container">
        <h3>Add recepients</h3>
        <div className="addrecepient-head">Enter Account Number</div>
        <div className="addrecepient-input-container">
          <input type={"tel"} pattern="\d*" placeholder="Enter account number" maxLength="8" onChange={(e)=>setInputData({
            accountNo : e.target.value
          })}/></div>




<div className="addreceip-btn-container">
{(inputData.accountNo.length >= 8  ) && !(value[0]?.recepients.filter((e)=>e.primary_account_number == inputData.accountNo)[0]?.primary_account_number == inputData.accountNo
   ||
   value[0]?.recepients.filter((e)=>e.primary_account_number == inputData.accountNo)[0]?.savings_account_number == inputData.accountNo)
   ? <button  onClick={fun} >Add Me</button> :  <button  onClick={fun} style={{background:"lightgrey"}} disabled ></button>}
        <button onClick={toggle}>View Recipients</button>
       </div>
       </div>




     


      {state && (
        <div
          className="recipients_requests"
          
        >
          <Row className="rows">
            <Col style={{border:"1px solid black"}}>
              <strong>Sr No</strong>
            </Col>
            <Col style={{border:"1px solid black"}}>
              <strong>Full Name</strong>
            </Col>
            <Col style={{border:"1px solid black"}}>
              <strong>Primary Account</strong>
            </Col>
            <Col style={{border:"1px solid black"}}>
              <strong>Savings Account</strong>
            </Col>
            <Col style={{border:"1px solid black"}}>
              <strong>Status</strong>
            </Col>
          </Row>
          {value.filter(
              (e) =>
                e.primary_account_number == userData.primary_account_number ||
                e.savings_account_number == userData.savings_account_number
            )[0]
            ?.recepients.map((e, i) => (
              <Row key={i}>
                <Col className="Cols">
                  <strong>{i + 1}</strong>
                </Col>
                <Col className="Cols">
                  {e.first_name} {e.last_name}
                </Col>

                <Col className="Cols">{e.primary_account_number}</Col>
                <Col className="Cols">{e.savings_account_number}</Col>
                <Col className="Cols">
                  {e.status ? (
                    <div style={{ color: "green" }}>Confirmed</div>
                  ) : (
                    <div style={{ color: "red" }}>Pending</div>
                  )}
                </Col>
              </Row>
            ))}
        </div>
      )}
    </div>
  );
}

export default AddRecepient;

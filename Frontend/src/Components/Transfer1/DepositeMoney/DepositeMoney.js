import React, { useEffect, useState } from 'react'
import {Link} from "react-router-dom"
import axios from 'axios'
import AddRecepient from './AddRecepient'
import './DepositeMoney.css'

import BootNavBar from '../../BootNavbar/BootNavBar'

function DepositeMoney() {
  
  const date = new Date();
    const[data,setData] = useState([])
    const[copy_history,setCopy_history] = useState([])
    const[z,setZ] = useState([])
    const[inp,setInp] = useState({
      account_number:"",
      amount:""
    })
    const id = localStorage.getItem("obb")?.split(',')[0]?.split('"')[1]
    const[show,setShow] = useState(true)





    useEffect(()=>{
      axios.get("http://localhost:4000/api/v1/users") .then((res)=>(setData(res.data.users))).catch((error)=>(console.log(error)))
        
      
      .catch((error)=>(console.log(error)))
    },[])
    



    //get signin userId from receip database
const newId = data.filter((e)=>e._id == id)[0]?.primary_account_number

const newData = z.filter((r)=>r.primary_account_number == `${newId}`)[0]?.recepients.filter((e)=>e.primary_account_number == inp.account_number || e.savings_account_number == inp.account_number)

   const receipId = (z.filter((e)=>e.primary_account_number == `${newId}`)[0]?._id);
   const postUserData = data.filter((e)=>(e.primary_account_number == inp.account_number || e.savings_account_number == inp.account_number))
 
   var r = false
   var y = ""


//Validations
   if(inp.account_number.length == 8){
    if(newData?.length !== 0 && newData?.length !== undefined){
     if(newData[0]?.status == true){
       r = true
       y="User Exists...!!!"
      
     }
     else{
      r = true
      y="Request Pending...!!"
      
     }
    }
    else{
      r = true
      y="User Doesnt exists...!!!"
      
    }
    
  }
 const userReceip =  z.filter((e)=>e.primary_account_number == `${newId}`)
  




  let fun=async()=>{


    if(postUserData.length == 1){
      const {_id,savings_balance,primary_balance,first_name,last_name,primary_account_number,savings_account_number} = postUserData[0]


      var update ={}
     if(inp.account_number.slice(0,4) == 9999){
      const copy_data_primary = [...userReceip[0]?.transfer_history_primary]
      
         update = {
          transfer_history_primary:copy_data_primary.concat([{
                                    first_name:first_name,
                                    last_name:last_name,
                                    primary_account_number:primary_account_number,
                                    
                                    primary_balance:JSON.parse(inp.amount),
                                    transfer_status:"false",
                                    date
                                  }])
                    }
                    
      }
        else{
          const copy_data_savings = [...userReceip[0]?.transfer_history_saving]
           update = {
            transfer_history_saving:copy_data_savings.concat([{

                                  first_name:first_name,
                                  last_name:last_name,
                                  savings_account_number:savings_account_number,
                                   savings_balance:  JSON.parse(inp.amount),
                                   transfer_status:"false",
                                   date
            }])
           }
          
        }
  
        await  axios.put(`http://localhost:4000/api/receip/${receipId}`,update) .then((res)=>(console.log(res))).catch((error)=>(console.log(error))) //add logined user id
        
      
    }
 await   axios.get("http://localhost:4000/api/receip")
      .then((res)=>(setZ(res.data),
      setCopy_history(res.data))
       )
     
    await    axios.get("http://localhost:4000/api/users") .then((res)=>(setData(res.data))).catch((error)=>(console.log(error)))
      
    
  setInp({
      account_number:"",
      amount:""
    })
  }

  


  return (
    <div>
      <BootNavBar/>
   
    <div className="depositemoney-main-container">



      
       <div  className='depositemoney-container'>
        <h3>Transfer Money</h3>
         <h5>From - </h5>
         <div className="selectFrom">
                <select
                  name="account"
                  value={''}
                  onChange={(e) => e}
                >
            
                  <option>Primary Account</option>
                  <option>Secondary Account</option>
                </select>
              </div>

              <div>To - </div>
          <div className='depositemoney-head'>Enter Account Number</div>
          <div className='depositemoney-input-container' style={y == "User Exists...!!!"?{color:"green",textAlign:"left"}:{color:"red",textAlign:"left"}}>
          <input maxLength={"8"} value={inp.account_number} placeholder='Enter account number' onChange={(e)=>setInp({
            ...inp,
            account_number:e.target.value,
          })}  style={{width:"100%"}}/><br/>
           { r && `${y}`}
          </div>
         
          <div className='depositemoney-head'>Enter Amount</div>
          <div className='depositemoney-input-container'>
        <input type={"number"} placeholder='Enter amount' value={inp.amount} onChange={(e)=>setInp({
          ...inp,
          amount:e.target.value,
        })} style={{width:"100%"}}/>
        </div>
        
        <div className='depositemoney-btn-container'>
        {y == "User Exists...!!!" && inp.amount !== "" ?<button  onClick={fun} >Send Money</button> : <button   disabled>Send Money</button>}
        <div className='btn-link'><Link style={{textDecoration:"none",color:"white"}} to={'/transaction-type'}>View History</Link></div>
        </div>
        </div>
       <div className='addreceip-container'><AddRecepient/></div>

        </div>
    </div>
  )
}

export default DepositeMoney
import React, { useEffect, useState } from 'react'
import BootNavBar from '../BootNavbar/BootNavBar'
import './ChequebookRequest.css'
import { Row,Col } from 'react-bootstrap'
import BootFooter from '../Footer/BootFooter'
import axios from 'axios'
import BlockModal from '../BlockModal/BlockModal';
import { Link } from 'react-router-dom'
import { useToasts } from 'react-toast-notifications';
function ChequebookRequest({modalShow}) {
  const { addToast } = useToasts();
    let arr = [
        "Sr No",
        "Account Type",
      "Description",
       "Date",
        
        "Status"
    
    ]
    const id = localStorage.getItem("obb")?.split(',')[0]?.split('"')[1]
    const[selectOption,setSelectOption] = useState("Primary Account")
    const[description,setDescription] = useState('')
    const[data,setData]=useState([])
    const[viewInfo,setViewInfo] = useState(true)
    const date = new Date();
   
   useEffect(()=>{
axios.get(`http://localhost:4000/api/chequebook/search/${id}`).then((res)=>setData(res.data)).catch((err)=>console.log(err))
   },[])
    
const new_data = data?.filter((e)=>e.transactionType == selectOption)

let fun=async()=>{
   
    
   
var update = {}
if(selectOption == "Primary Account"){
     update = {
      
                userId:id,
                  transactionType:selectOption,
                  description:description,
                  isApproved:"false",
                  dateCreated:date,
                  dateApproved:"",
                  approvedBy:""
     
    }
}
else{
    update = {
       
           
                userId:id,
                transactionType:selectOption,
                description:description,
                isApproved:"false",
                dateCreated:date,
                dateApproved:"",
                approvedBy:""
       
    
        
    }
}

     await axios.post(`http://localhost:4000/api/chequebook`,update).then((res)=> addToast("Request Successful",{appearance:"success"})).catch((err)=> addToast("Error",{appearance:"error"}))
     axios.get(`http://localhost:4000/api/chequebook/search/${id}`).then((res)=>setData(res.data)).catch((err)=>console.log(err))
   
     selectOption("Primary Account")
     setDescription("")
}






  return (
    <div>
        <BootNavBar/>
        <BlockModal
        backdrop="static"
        show={modalShow == undefined ? false :JSON.parse(modalShow)}
      />
        <div className='check-main-container'>
            
       <div className='tt2'>
       <div className='tt1'>Request Cheque Book Request</div>
        
            <div className='chequebook-details-container'>
                <div className='pick-account-container'>
                    <div className='pick-account-head'>Pick an account</div>
                    <div className='pick-account-dropdown'>
                        <select value={selectOption} onChange={(e)=>setSelectOption(e.target.value)}>
                            <option value={"Primary Account"}>Primary Account</option>
                            <option value={"Saving Account"}>Saving Account</option>
                        </select></div>
                </div>
                <div className='pick-account-container'>
                    <div className='pick-account-head'>Description</div>
                    <div className='pick-account-dropdown'>
                        <textarea  placeholder='Enter description here...' rows="6" cols="130" name="comment" value={description} form="usrform" onChange={(e)=>setDescription(e.target.value)}></textarea>
                    </div>
                </div>
            </div>
            <div className='chequebook-edit-btn'>
              <div className='btnn-container' >

            
               
              






              {
                selectOption == "Primary Account" && (new_data[0]?.transactionType == selectOption ?<button id='requestsent'  onClick={fun} style={{width:"100%",background:"red",opacity:"0.5",color:"white"}} disabled>Request sent</button> :<button onClick={fun} style={{width:"100%",height:"100%",color:"white",background:"#8699da",border:"none"}}>Submit Request</button>)
              } 
                {
                selectOption !== "Primary Account" && (new_data[0]?.transactionType == selectOption ?<button id='requestunsent' onClick={fun} style={{width:"100%",background:"red",opacity:"0.5",color:"white"}} disabled>Request sent</button> :<button onClick={fun} style={{width:"100%",height:"100%",color:"white",background:"#8699da",border:"none"}}>Submit Request</button>)
              } 
                <div className='viewRequest-btn1'><Link className='btncontainerlink' style={{width:"100%",border:"none"}} to={"/chequebookTransaction"}>View Request</Link></div>

                </div>
                
            </div>
        </div>

      





               
        </div>
        <div style={{position:"absolute",bottom:"0px",width:"100%"}}><BootFooter/></div>
    </div>
  )
}

export default ChequebookRequest

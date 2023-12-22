import React, { useState,useEffect } from 'react'
import BootNavBar from '../../BootNavbar/BootNavBar'
import BootFooter from '../../Footer/BootFooter'
import './AddRecepients.css'
import {Row,Col} from 'react-bootstrap'
import axios from 'axios'
import { Checkmark } from 'react-checkmark'

import BlockModal from '../../BlockModal/BlockModal';
import {  useToasts } from 'react-toast-notifications';
function AddRecepients({modalShow}) {
  const { addToast } = useToasts();
const date = new Date()
  const[state,setState] = useState(true)
  const[disabled,setDisabled] = useState(false)
  const[value,setValue]=useState(false)
  const[hook,setHook]=useState(true)
  const[hook1,setHook1]=useState(false)
  const[userAccountData,setUserAccountData] = useState([])
  const[userAccountData1,setUserAccountData1] = useState([])
  const[nData,setNdata] = useState(null)
  const[data,setData] = useState({
    recepientAccount:"",
    recepientName:"",
    bankName:"",
    swiftCode:"",
    recepientAccountOthers:"",
    acId:""
  })
  const id = localStorage.getItem("obb")?.split(',')[0]?.split('"')[1]
const[userName,setUserName] = useState([])


  useEffect(() => {
    axios.get(`http://localhost:4000/api/userAccount/join/${id}`).then((res)=>setUserName(res.data))


    if(data.recepientAccount == ""){setUserAccountData([])}
    if(data.recepientAccount == ""){setUserAccountData1([])}

   
      {data.recepientAccount !== "" && axios.get(`http://localhost:4000/api/userAccount/join/${data.recepientAccount}`).then((res)=>setUserAccountData(res.data)).catch((error)=>addToast(error.message, { appearance: 'error' })
      )}
    
    
   
   
   axios.get(`http://localhost:4000/api/userRecepients/id/${id}`).then((res)=>setUserAccountData1(res.data)).catch((err)=>console.log(err))

    }, [data.recepientAccount,data])

    const userPrimaryAccount = userName?.filter((e)=>e.accounttype == "Primary Account")[0]?.accountnumber
    const userSavingsAccount = userName?.filter((e)=>e.accounttype == "Savings Account")[0]?.accountnumber
    


var validation=(e)=>{
  setHook1(false)
  setData({
    ...data,
    recepientAccount:e.userData[0]?.first_name + " " + e.userData[0]?.last_name,
    acId:e._id
  });
setHook(false);
setNdata(e.accountnumber);





if(userAccountData1?.filter((r)=>r.recipientaccountId == e._id).length == 1){
  console.log(userAccountData1?.filter((e)=>e.recipientaccountId == e._id).length);
  setDisabled(true)
  addToast("Recipient Already Exists",{appearance:"error"})
}

if(userPrimaryAccount == e?.accountnumber || userSavingsAccount == e?.accountnumber){
  setDisabled(true)
  addToast("LogedIn User Cannot Be Added",{appearance:"error"})
}



}


 
const fun=async(e)=>{
  e.preventDefault()
  var post = {}
  if(!value){
    post = {
      userId:id,
      recipientaccountId:data.acId,
      recipientType:"ICIN Bank",
      isApproved:"false",
      dateCreated:date,
      dateApproved:"",
      approvedBy:"123"
    }
  }
  else{

    post={
      userId:id,
      recipientType:"Other Bank",
      recipientName:data.recepientName,
      bankName:data.bankName,
      accountNumber:data.recepientAccountOthers,
      swiftCode:data.swiftCode,
      isApproved:"false",
      dateCreated:date,
      dateApproved:"",
      approvedBy:"admin",
    }
   
  }
 
  await axios.post("http://localhost:4000/api/userRecepients",post).then((res)=>console.log(res)).catch((err)=>console.log(err))
  await  axios.get(`http://localhost:4000/api/userRecepients/id/${id}`).then((res)=>setUserAccountData1(res.data)).catch((err)=>console.log(err))
  setData({
    recepientAccount:"",
    recepientName:"",
    bankName:"",
    swiftCode:"",
    recepientAccountOthers:""
  })
  setHook(true)
  
    addToast("Request Successful",{appearance:"success"})
  
    
  
 
  
}

    const buttonInput =(e)=>{
      setHook(true)
      setDisabled(false)
      setData({
        ...data,
        recepientAccount:e.target.value
      })
    }
 
  return (
    
    <div onClick={()=>setHook1(false)}>
       <BlockModal
        backdrop="static"
        show={modalShow == undefined ? false :JSON.parse(modalShow)}
      />
        <BootNavBar/>

<div className='rnt-container' >

<div className='rnt-1'>
    <div className='rnt-6'>Add Recepients</div>


    <div className='ert-5'> Select Bank </div>
    <div className='rnt-2'>


      <div className='rnt-3'>


      <div className="form-check">
  <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" onChange={e=>setValue(false)}   defaultChecked/>
  <div className="form-check-label" htmlFor="flexRadioDefault1">
    ICIN BANK
  </div>
</div>
</div>
      <div className='rnt-4'> 


      <div className="form-check">
          <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2"  onChange={e=>(setValue(true))} />
          <div className="form-check-label" htmlFor="flexRadioDefault2">
            Others
          </div>
      </div>
       
      </div>

       

      
</div>
<form onSubmit={fun}>
<div className='ert-6'>

 <div className='rnt-7'>
        <div className='rnt-8'>Recepient Search</div>
        <input placeholder='Name or Account Number' type={'text'} list="browsers" className="form-control"  id="validationDefault01" value={data.recepientAccount} onChange={e=>(buttonInput(e),setHook1(true))} style={{width:"100%"}} disabled={value} required/>
       
     <div >
     {hook1 && data.recepientAccount !== "" && <div className='scrollerRecipientAccount'  style={{zIndex:"1",boxShadow:"0px 0px 20px black",position:"absolute",width:"24%",background:"white"}}>
      {hook && userAccountData.map((e,i)=>
       
    <div id="browsers" key={i} >


        <div onClick={()=>validation(e)} style={{fontSize:"15px"}}>
          
            {(e.userData[0]?.first_name)?.charAt(0).toUpperCase()+ (e.userData[0]?.first_name)?.slice(1) }{" "}
            {(e.userData[0]?.last_name)?.charAt(0).toUpperCase() + (e.userData[0]?.last_name)?.slice(1) } {"- "}
            {e?.accountnumber} {"- "}
            {(e?.accounttype)}

          </div>
        </div>
        
     
    
      )}
      
</div>}

</div>
{!hook && <div className='wrt1'><div className='verifiedAccount' ><div className='verified1'>Name:-<p style={{color:"green"}}>{data.recepientAccount}</p> </div>  <div className='verified1'>A/C : - <p style={{color:"green"}}>{nData}</p></div><div> <Checkmark size='20px' /></div> </div></div>}
     </div>


<div className='ert-1'>
    <div className='ert-2'>
      <div className='ert-11'>Recepient Name</div>
      
      <input placeholder='Enter Receipient Full Name' className="form-control" id="validationDefault02"  value={data.recepientName}  onChange={e=>setData({
          ...data,
          recepientName:e.target.value
        })} style={{width:"100%"}}  disabled={!value} required/>
   
    </div>

    <div className='ert-3'>
    <div className='ert-12'>Bank Name</div>
     
       <input placeholder='Enter Bank Name' className="form-control" id="validationDefault03"  value={data.bankName}  onChange={e=>setData({
          ...data,
          bankName:e.target.value
        })} style={{width:"100%"}}  disabled={!value} required/>
   
    </div>

    <div className='ert-4'>
    <div className='ert-13'>SwiftCode </div>
     
     <input placeholder='Enter SwiftCode' className="form-control" id="validationDefault04"  value={data.swiftCode}  onChange={e=>setData({
          ...data,
          swiftCode:e.target.value
        })} style={{width:"100%"}}  disabled={!value} required/>
   
    </div>
    <div className='ert-4'>
    <div className='ert-13'>Receipient Account Number </div>
     
     <input placeholder='Enter Account' type={'number'} className="form-control" id="validationDefault05" value={data.recepientAccountOthers}  onChange={e=>setData({
          ...data,
          recepientAccountOthers:e.target.value
        })} style={{width:"100%"}}  disabled={!value} required/>
   
    </div>

</div>

<div className='tre-100' >
   { !value && <div className='tre-1'>{hook == false?<button  id='rr1' type='submit'  style={{width:"100%"}} disabled={disabled}>Add</button>:<button id='rr1' type='submit'  style={{width:"100%"}} disabled>Add</button>}</div>}
   


    {value && <div className='tre-1'><button id='rr1' type='submit'  style={{width:"100%"}}>Add</button></div>}
   
    
</div>

</div>
</form>

</div>

        <div style={{position:"absolute",bottom:"0px",width:"100%"}}><BootFooter/></div>
    </div>
    </div>
  )
}

export default AddRecepients
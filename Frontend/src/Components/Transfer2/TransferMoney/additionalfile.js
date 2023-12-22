import React, { useEffect, useState } from 'react'
import BootNavBar from '../../BootNavbar/BootNavBar'
import BootFooter from '../../Footer/BootFooter'
import './TransferMoney.css'
import axios from 'axios'
import { Checkmark } from 'react-checkmark'
import { useToasts } from 'react-toast-notifications';
import BlockModal from '../../BlockModal/BlockModal';
import { Link } from 'react-router-dom'
function TransferMoney({modalShow}) {
  const { addToast } = useToasts();
  const[nData,setNdata] = useState([])
  const[userFilter,setUserFilter] = useState([])
const[hook1,setHook1]=useState(false)
const[hook,setHook] = useState(false)
const date = new Date()
  const[data,setData] = useState()
const[info,setInfo] = useState({
  accountType:"Primary Account",
  recipientName:"",
  amount:"",
  accountnumber:"",
  recipientId:""
})
const id = localStorage.getItem("obb")?.split(',')[0]?.split('"')[1]
const[userAccountData,setUserAccountData] = useState([])

useEffect(() => {
   
  axios.get(`http://localhost:4000/api/userRecepients/id/join/${id}`).then((res)=>setUserAccountData(res.data)).catch((err)=>console.log(err))
 axios.get(`http://localhost:4000/api/userAccount/${id}`).then((res)=>setNdata(res.data?.filter((e)=>e.accounttype == info.accountType)[0])).catch((err)=>console.log(err))
 axios.get(`http://localhost:4000/api/userRecepients/id/${id}`).then((res)=>setData(res.data.filter((e)=>e.recipientType =="Other Bank"))).catch((err)=>console.log(err))
   
  }, [info.recipientName,id])

 

const fromAccount = userAccountData.filter((e)=>e.userId == id)?.filter((e)=>e.recipientaccountId == info.recipientName,
)[0]?._id

const recipientsFilter = userAccountData.filter((e)=>e.RecipientName.first_name == info.recipientName)
const userAccountFilter = nData


var new_arr = []
var otherBankArr = []

setTimeout(()=>{
if (userAccountData.length !== undefined) {
  for (var i = 0; i < userAccountData.length; i++) {
    if(userAccountData[i]?.isApproved !== undefined){
    if (userAccountData[i]?.RecipientName?.first_name || userAccountData[i]?.RecipientName?.first_name  !== undefined) {
      const { first_name, last_name } = userAccountData[i].RecipientName;
      const {isApproved } = userAccountData[i];
      const {accountnumber} = userAccountData[0]?.recipientsAccount
      new_arr.push({ firstName: first_name, lastName: last_name,isApproved:isApproved,accountnumber:accountnumber,recipientType:"ICIN Bank" });
    }
  }
}}

if(data !== undefined){
  
  for(var i =0;i<data.length;i++){
    if(data[i]?.accountNumber !==undefined){

   
    const{accountNumber,swiftCode,recipientName,recipientType, isApproved   } = data[i]

    otherBankArr.push({accountnumber:accountNumber,swiftCode:swiftCode,recipientName:recipientName,recipientType:recipientType,isApproved:isApproved})
  }
}
}

if(new_arr !== undefined || otherBankArr !== undefined){
    for(var i=0;i<otherBankArr.length ;i++){
      new_arr.push(otherBankArr[i])
    }
}

console.log(new_arr);
},0)







const fun=async(e)=>{

  e.preventDefault()
  const postData = {
    userId:id,
  transferType:info.accountType,
  //primary account or savings account id
  fromAccountId:fromAccount,
  recipientId:info.recipientId,
  amount:info.amount,
  comment:info.comment,
  isApproved:"false",
  dateCreated:date,
  dateApproved:"",
  approvedBy:"saurav",
  }
 if(userAccountFilter.amount<info.amount ){
  addToast("Insufficient Balance",{appearance:"error"})
 }
 else{
const updatedAmount = parseInt(info?.amount)
console.log(updatedAmount);
await  axios.put(`http://localhost:4000/api/userAccount/update/${userAccountFilter?._id+"-T"}`,{amount:(updatedAmount)}).then((res)=>setNdata(res.data)).catch((err)=>console.log(err))
   
  await axios.post("http://localhost:4000/api/userTransfer",postData).then((res)=>console.log(res)).catch((err)=>console.log(err))
  addToast("Request Successfull",{appearance:"success"})
 }
  
  setInfo({
    accountType:"Primary Account",
  recipientName:"",
  amount:"",
  comment:""
  })
}
  
var validation=(e)=>{
 
 setInfo({
  ...info,
  recipientName:e.RecipientName.first_name + " "+ e.RecipientName.last_name,
  accountnumber:e.recipientsAccount.accountnumber,
  recipientId:e.recipientsAccount._id
 })
 
}

  return (
    <div onClick={()=>setHook1(false)}>
       <BlockModal
        backdrop="static"
        show={modalShow == undefined ? false :JSON.parse(modalShow)}
      />
        <BootNavBar/>

<div>{new_arr !== null ? new_arr.map((e,i)=>
<p>{e.firstName}</p>
) : "hj"}</div>
            <div className='cnt-1'>

<div className='cnt-2'>
<form onSubmit={fun}>
<div className='cnt-191'>Transfer Money</div>

    <div className='cnt-3'>
      <div className='cnt-12'>

      
        <div className='cnt-8'>- From -</div>
        
        <div className='cnt-4'>
        <div className="cnt-7">Select Account Type</div>
                <select
                id='inputTransfer'
                  name="account"
                  value={info.accountType}
                  onChange={(e) => setInfo({
                    ...info,
                    accountType:e.target.value
                  })}
                >
            
                  <option>Primary Account</option>
                  <option>Savings Account</option>
                </select>
             
        </div>
       
        <div className='cnt-17'>
          <div className='cnt-18'>Account Number</div>
          <input id='inputTransfer' value={userAccountFilter?.accountnumber} disabled/>
          
        </div>
        </div>
<hr className='hr11'></hr>
        <div className='cnt-13'>
        <div className='cnt-5'>- To - </div>
        
        <div className='cnt-9'>
            <div className='cnt-6'>
                    Enter Recepient Name
            </div>
            <input  id="validationDefault01"  value={info.recipientName} className="form-control"  placeholder='Enter Recipient Name' onChange={(e)=>(setInfo({
              ...info,
              recipientName:e.target.value
            }),setHook1(true))} required/>
       
        {hook1 && info.recipientName !== "" && <div className='scrollerRecipientAccount1'  style={{zIndex:"1",boxShadow:"0px 0px 20px black",position:"absolute",width:"24%",background:"white"}}>
       {/* {!hook && userAccountData?.filter((r)=>r.isApproved == "true").map((e,i)=> */}
       {!hook && new_arr.map((e,i)=>
        <div id="browsers1" key={i} >


        <div onClick={()=>validation(e)}> 

       

                {/* {(e.RecipientName?.first_name)?.charAt(0).toUpperCase()+ (e.RecipientName?.first_name)?.slice(1) }{" "}
                {(e.RecipientName?.last_name)?.charAt(0).toUpperCase() + (e.RecipientName?.last_name)?.slice(1) } {"- "}
                {e?.recipientsAccount.accountnumber} */}
        

           <div>

            {(e?.firstName)?.charAt(0).toUpperCase()+ (e?.firstName)?.slice(1) }{" "}
            {(e?.lastName)?.charAt(0).toUpperCase() + (e?.lastName)?.slice(1) } {"- "}
            {e?.accountnumber}
            </div> :
            <div> 
            {(e?.firstName)?.charAt(0).toUpperCase()+ (e?.firstName)?.slice(1) }{" "}
            {(e?.lastName)?.charAt(0).toUpperCase() + (e?.lastName)?.slice(1) } {"- "}
            {e?.accountnumber}
            
            </div>
            
        
      </div>
        </div>)}
        
        </div>}

        {!hook && info.recipientName !== "" && <div className='wrt1'><div className='verifiedAccount' ><div className='verified1'>Name:-<p style={{color:"green"}}>{info.recipientName}</p> </div>  <div className='verified1'>A/C : - <p style={{color:"green"}}>{info?.accountnumber}</p></div><div> <Checkmark size='20px' /></div> </div></div>}
        </div>
        <div className='cnt-11'>
          <div className='cnt-10'>Enter Amount</div>
          <input  id="validationDefault02"  value={info.amount} type={"number"} className="form-control"  placeholder='Enter Amount' onChange={e=>setInfo({
            ...info,
            amount:e.target.value
          })} required/>
        </div>
        <div className='cnt-20'>
          <div className='cnt-21'>Comments</div>
          <textarea id='inputTransfer' value={info.comment} placeholder='Comments' onChange={e=>setInfo({
            ...info,
            comment:e.target.value
          })}/>
        </div>
        </div>

        
          <div className='cnt-15' style={{borderRadius:"0.5rem"}}><button type="submit" style={{width:"100%",height:"100%",borderRadius:"0.5rem"}}>SEND</button></div>
         
        
    </div>
    <div className='cnt-16' style={{borderRadius:"0.5rem"}}><button style={{width:"100%",height:"100%",borderRadius:"0.5rem"}}><Link to={'/transferTransaction'}className="transactionHistBtn">Transactions</Link></button></div>
    </form>
</div>


            </div>
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        <div style={{position:"absolute",bottom:"0px",width:"100%"}}><BootFooter/></div>
        
    </div>
  )
}

export default TransferMoney
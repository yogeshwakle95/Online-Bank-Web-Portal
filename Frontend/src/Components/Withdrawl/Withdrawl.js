import React, { useEffect, useState } from 'react';
import '../Withdrawl/Withdrawl.css';
import axios from 'axios';
import BootNavBar from '../BootNavbar/BootNavBar';
import BootFooter from '../Footer/BootFooter'
import BlockModal from '../BlockModal/BlockModal';
import { useToasts } from 'react-toast-notifications';
import { Link } from 'react-router-dom';

function Withdrawl({modalShow}) {
  const { addToast } = useToasts();
  const [selectedOption, setSelectedOption] = useState("Primary Account");
  const [amount, setAmount] = useState();
  const[data,setData]= useState([])
  const id = localStorage.getItem("obb")?.split(',')[0]?.split('"')[1]

const dateCreated = new Date()
useEffect(()=>{
  axios.get(`http://localhost:4000/api/userAccount`).then((res)=>setData(res.data.filter((e)=>e.userId == id)))
 },[])

const new_data = data.filter((e)=>e.accounttype == selectedOption);

const userData={
  userId:id,
  accountId:new_data[0]?._id,
 transactionType:"Withdrawl",
 amount:amount ,
 isApproved :"false",
 
 dateApproved:'',
 approvedBy:'tanvi',
 dateCreated

}


   const handleWithdraw = async (event) => {

    if(amount === 0  || amount === null  || amount === ''  || amount === undefined){
      addToast("Enter amount",{appearance:"error"})
    }

    else{
     event.preventDefault();
    await axios.post('http://localhost:4000/api/userTransaction',userData).then(response => {
      addToast("Request Successfull",{appearance:"success"})
     
   })
   setAmount("")
  }
  
 }

 

  return (
<div>
<BootNavBar/>
<BlockModal
        backdrop="static"
        show={modalShow == undefined ? false :JSON.parse(modalShow)}
      />
    <div className='container56'>
      
        <div className='ent2'>
          Withdrawal Money
        </div>
      <div className='ent1'>
        <div className='container2-56'>
          <div className='text21'>
          Pick an account  
          </div>

          
          <div>
            <select value={selectedOption} onChange={e => setSelectedOption(e.target.value)} style={{width:'70%'}}>

              <option>Primary Account</option>
              <option>Savings Account</option>
            </select>
          </div>
        </div>
        <div className='container3-56'>
        <div className='text21'>
         Enter amount <span style={{color:"red"}}>*</span>
          </div>

          <div>
            <input type='number' value={amount} placeholder="amount.." onChange={e => setAmount(e.target.value)} style={{ width: '70%' }} />
          </div>
        </div>
        <div className='button-container1-56'>
          <button className='btn1' onClick={handleWithdraw}>Withdraw</button>
          <button  className='btn2'><Link to={'/withdrawlTransaction'} style={{textDecoration:"none",color:"white"}} >View Transaction</Link></button>
        </div>
      </div>
    </div>

   <div style={{position:"absolute",bottom:"0px",width:"100%"}}><BootFooter/></div>
    </div>
  );
}

export default Withdrawl;
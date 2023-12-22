import React, { useEffect, useState } from 'react';
import AdminNavBar from '../AdminNavBar/AdminNavBar';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import {Pie } from 'react-chartjs-2';
import '../Dashboard/AdminDashboard.css';
import BootFooter from '../../Footer/BootFooter';
import axios from 'axios'
ChartJS.register(ArcElement, Tooltip, Legend);
function AdminDashboard() {
  const[count,setCount] = useState([])
  const[userTransfer,setUserTransfer] = useState([])
  const[userRecipients,setUserRecipients] = useState([])
  const[userChequebook,setUserChequebook] = useState([])
  const[userTransaction,setUserTransaction] = useState([])
  
  useEffect(()=>{
    axios.get("http://localhost:4000/api/v1/users").then((res)=>setCount(res.data.users))
    axios.get("http://localhost:4000/api/chequebook").then((res)=>setUserChequebook(res.data))
     axios.get("http://localhost:4000/api/userRecepients").then((res)=>setUserRecipients(res.data))
     axios.get("http://localhost:4000/api/userTransaction").then((res)=>setUserTransaction(res.data))
    axios.get("http://localhost:4000/api/userTransfer").then((res)=>setUserTransfer(res.data))
},[])

const blockedUsers = count?.filter((e)=>e.disable_status == "true").length
const FilterRecipientRequest = userRecipients?.filter((e)=>e.isApproved == "false").length 
const FilterTransferRequest = userTransfer?.filter((e)=>e.isApproved == "false").length 
const FilterTransactionRequest = userTransaction?.filter((e)=>e.isApproved == "false").length 
const FilterChequebookRequest = userChequebook?.filter((e)=>e.isApproved == "false").length 
 var data = {
    labels: ['Recepients Requests', 'Transfer Requests', 'Transaction Requests', 'Chequebook Requests'],
    datasets: [
      {
        label: 'Pending Requests',
        data: [FilterRecipientRequest,FilterTransferRequest, FilterTransactionRequest, FilterChequebookRequest],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          
        ],
        borderWidth: 1,
      },
    ],
  };
  var data1 = {
    labels: ['Blocked Users', 'Total Users '],
    datasets: [
      {
        label: 'users',
        data: [12, 19],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          
        ],
        borderWidth: 1,
      },
    ],
  };





  return (
    <div>
      <AdminNavBar />
        <div className="heading">
        <h1>Welcome to the Admin Panel</h1>
        </div>
        <div className="mainContainer">
          <div className='piechart'>
            <div className='d1' ><Pie  data={data}  />
              <p>PieChart of User Requests</p>
            </div>
          </div>
          <div className="userContainer">
            <div className='totalUser'>
                <p>Total Users</p>
                <p>{count.length}</p>
            </div>
            <div className="blockedUser">
                <p>Blocked Users</p>
                <p>{blockedUsers}</p>
            </div>
          </div>
        </div>
        <BootFooter/>
    </div>
  )
}

export default AdminDashboard
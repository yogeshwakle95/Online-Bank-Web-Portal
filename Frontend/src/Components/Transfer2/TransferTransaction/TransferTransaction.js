import React, { useState,useEffect } from 'react'
import { Link } from 'react-router-dom'
import BootNavBar from '../../BootNavbar/BootNavBar'
import './TransferTransaction.css'
import axios from 'axios'

import Pagination from 'react-js-pagination';
import BootFooter from '../../Footer/BootFooter'


function TransferTransaction() {
    let arr=[
        "Sr No",
        "Account Type",
       
        "Date",
        "Amount",
        "Action"
        ]

        
const itemsPerPage = 12;
const [activePage, setActivePage] = useState(1);


        const[data,setData] = useState([])
        const id = localStorage.getItem("obb")?.split(',')[0]?.split('"')[1]
        useEffect(()=>{
            axios.get(`http://localhost:4000/api/userTransfer/userTransferData/data/${id}`).then((res)=>setData(res.data))
        },[])
       
        
const indexOfLastItem = activePage * itemsPerPage;
const indexOfFirstItem = indexOfLastItem - itemsPerPage;
const currentItems = data?.slice(indexOfFirstItem, indexOfLastItem);


const handlePageChange = (pageNumber) => {
  setActivePage(pageNumber);
  
};
  return (
    <div>
        <BootNavBar/>
        
        
        <div className="container">

    <div className='iit2_btn'><Link className='iit2_btn_link' to={"/transferMoney"}><i className="fa fa-arrow-left" id='iit2_icon' ></i> Back</Link></div>
    <div className='iit1'>Transfer Transaction History</div>
<table className="table table-bordered">
  <thead>
    <tr>
      {arr.map((e,i)=>
      
      <th key={i}>{e}</th>
      )}
     
    </tr>
  </thead>
  <tbody>
    {(data !== null || data !== undefined) ? data.map((e,j) => 
    
      <tr key={j}>
        <td>{j+1}</td>
        <td>{e?.transferType}</td>
        <td>${e?.amount }</td>
        <td>{new Date(e.dateCreated).toLocaleString()}</td>
     
     
        
     
        
        <td>
        {e.isApproved === "false" ? (
          <div style={{ color: "red" }}>Pending..</div>
        ) : e.isApproved === "true" ? (
          <div style={{ color: "green" }}>Confirmed</div>
        )  : e.isApproved === "cancel" ? (
          <div style={{ color: "red" }}>Cancelled</div>)
        :null}
      </td>
    
          
    
      </tr>
    ):null}
  </tbody>
</table>


  </div>
  <div className='paginationTransaferHistory'>
<Pagination
        activePage={activePage}
        itemsCountPerPage={itemsPerPage}
        totalItemsCount={data.length}
        pageRangeDisplayed={2}
        onChange={handlePageChange}
        itemClass="page-item"
        linkClass="page-link"
      />

</div>

<div style={{position:"absolute",bottom:0,width:"100%"}}>  <BootFooter/></div>
  </div>
  )
}

export default TransferTransaction
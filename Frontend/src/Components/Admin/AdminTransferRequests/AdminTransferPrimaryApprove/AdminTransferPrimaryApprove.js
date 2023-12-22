import React,{useState,useEffect} from 'react'
import BootFooter from '../../../Footer/BootFooter'
import AdminNavBar from '../../AdminNavBar/AdminNavBar'
import './AdminTransferPrimaryApprove.css'
import AdminModelTransferRequest from '../../AdminModelTransferRequest/AdminModelTransferRequest'
import {Row,Col} from 'react-bootstrap'
import axios from "axios"
import { Link } from 'react-router-dom'
import Pagination from 'react-js-pagination';
function AdminTransferPrimaryApprove() {
    let arr = [
        "Sr No",
        "UserId",
        "First Name",
        "Last Name",
        "Email",
        "Mobile",
        
        "Account Type",
        "Action"

    ]
    const itemsPerPage = 18;
  const [activePage, setActivePage] = useState(1);

    
const [modalShow, setModalShow] = useState(false);
const[userData,setUserData]= useState([])

const[btn,setBtn] = useState(true)
const[modelData,setModalData] = useState()

useEffect(() => {
    axios.get("http://localhost:4000/api/userTransfer/allTransferUser/users").then((res)=>setUserData(res.data)).catch((err)=>console.log(err))
    
    }, [])


    const indexOfLastItem = activePage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const final_data = userData?.filter((t)=>t.isApproved == "true"|| t.isApproved=="cancel")
    const currentItems = final_data.slice(indexOfFirstItem, indexOfLastItem);




    const handlePageChange = (pageNumber) => {
      setActivePage(pageNumber);
      
    };





let newFun=(e)=>{
    setModalData(e)
    setModalShow(true)
}
console.log(userData);

  return (
    <div>
        <AdminNavBar/>

<div>


    
    
   
    
 


    <div className="container">
    <div className='btnButton-primary'>
    <Link to={'/admin_transfer_requests'} className='btnButton-primary-link' ><i className='fa fa-arrow-left' style={{paddingRight:"5px"}}></i> Back</Link>
    </div>
    <div className='nit4'>Transfer Request - Confirmed</div>
      <table className="table table-bordered">
        <thead>
          <tr>
            {arr.map((e,i)=>
            
            <th key={i}>{e}</th>
            )}
           
          </tr>
        </thead>
        <tbody>
          {(userData !== null || userData !== undefined) ? currentItems?.map((e,j) => 
          
            <tr key={j}>
              <td>{j+1}</td>
              <td>{e?.userData1[0].username}</td>
              <td>{e?.userData1[0].first_name }</td>
              <td>{e?.userData1[0].last_name }</td>
           
              <td>{e?.userData1[0].email}</td>
              <td>{e?.userData1[0].mobile}</td>
              <td>{e.transferType}</td>
              




     
              <td>
        { e.isApproved === "true" ? (
          <div style={{ color: "green" }}>Confirmed</div>
        )  : e.isApproved === "cancel" ? (
          <div style={{ color: "red" }}>Cancelled</div>)
        :e.isApproved === "insufficient" ? (
          <div style={{ color: "red" }}>Confirmed</div>):null}
      </td>


            </tr>
          ):null}
        </tbody>
      </table>
    
      
      






<AdminModelTransferRequest accountinfo={modelData}
                                      show={modalShow} 
                                      onHide={() => setModalShow(false)}/>







   
    

      
    
</div>
    
</div>

<div className='paginationTransaferHistory'>
<Pagination
        activePage={activePage}
        itemsCountPerPage={itemsPerPage}
        totalItemsCount={userData.length}
        pageRangeDisplayed={2}
        onChange={handlePageChange}
        itemClass="page-item"
        linkClass="page-link"
      />

</div>
<div style={{position:"absolute",bottom:0,width:"100%"}}>
<BootFooter/>
</div>
      
    </div>
  )
}

export default AdminTransferPrimaryApprove
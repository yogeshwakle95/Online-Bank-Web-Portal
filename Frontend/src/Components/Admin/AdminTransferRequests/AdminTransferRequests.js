import React,{useEffect,useState} from 'react'
import AdminModelTransferRequest from '../AdminModelTransferRequest/AdminModelTransferRequest'
import {Row,Col} from 'react-bootstrap'
import AdminNavBar from '../AdminNavBar/AdminNavBar'
import './AdminTransferRequests.css'
import BootFooter from '../../Footer/BootFooter'
import axios from "axios"
import Dropdown from 'react-bootstrap/Dropdown';
import { Link } from 'react-router-dom'
import { useToasts } from 'react-toast-notifications';
import Pagination from 'react-js-pagination';
function AdminTransferRequests() {
  const { addToast } = useToasts();
    let arr = [
        "Sr No",
        "UserId",
        "First Name",
        "Last Name",
        "Email",
        "Mobile",
        "Date Created",
        "Account Type",
        "Amount",
        "Action"

    ]
    const itemsPerPage = 12;
  const [activePage, setActivePage] = useState(1);


  
  const[data,setData]= useState()
const[userData,setUserData]= useState([])
const[userAccountData,setUserAccountData]= useState([])

const [modalShow, setModalShow] = useState(false);

const[updateUser,setUpdateUser]= useState([])
const[btn,setBtn] = useState(true)
const[modelData,setModalData] = useState()

useEffect(() => {
    axios.get("http://localhost:4000/api/userTransfer/allTransferUser/users").then((res)=>setUserData(res.data)).catch((err)=>console.log(err))
    
    }, [data])


console.log(userData);





let fun=async(e)=>{

}
let disableBtn=async(e)=>{ 
//



  const update = {
    amount :e.amount,
    recipientId:e.recipientId+"-D",
    isApproved:"true"
  }
  
if(e.isApproved == "cancel"){
  await axios.put(`http://localhost:4000/api/userTransfer/${e.id}`,{isApproved:"cancel"}).then((res)=>addToast("Rejected",{appearance:"error"}))
  await axios.get("http://localhost:4000/api/userTransfer/allTransferUser/users").then((res)=>setUserData(res.data)).catch((err)=>console.log(err))
}
else{
  await axios.put(`http://localhost:4000/api/userTransfer/${e.id}`,{isApproved:update.isApproved}).then((res)=>console.log(res))


  await axios.put(`http://localhost:4000/api/userAccount/update/${update.recipientId}`,{amount:update.amount}).then((res)=>(addToast("Approved",{appearance:"success"}),console.log(res))).catch((err)=>addToast("Request Failed",{appearance:"error"}))
  await axios.get("http://localhost:4000/api/userTransfer/allTransferUser/users").then((res)=>setUserData(res.data)).catch((err)=>console.log(err))
}

  
await axios.get("http://localhost:4000/api/userTransfer/allTransferUser/users").then((res)=>setUserData(res.data)).catch((err)=>console.log(err))
}  



const indexOfLastItem = activePage * itemsPerPage;
const indexOfFirstItem = indexOfLastItem - itemsPerPage;
const currentItems = userData?.slice(indexOfFirstItem, indexOfLastItem);




const handlePageChange = (pageNumber) => {
  setActivePage(pageNumber);
  
};

let savingsBtn=()=>{
    setBtn((prev)=>!prev)
}


let newFun=(e)=>{
    setModalData(e)
    setModalShow(true)
}

return (
<div className='admintransfer-main-container'>
 <AdminNavBar/>

 <div className="container">

    <div className='btnButton_nit1'>
    <Dropdown>
      <Dropdown.Toggle variant="dark" id="dropdown-basic">
       Request Status
      </Dropdown.Toggle>

      <Dropdown.Menu>
        {/* <Dropdown.Item as={Link}  to="" onClick={savingsBtn}>{btn==true ?"Other Bank ":"ICIN Bank "}</Dropdown.Item> */}
       
        <Dropdown.Item as={Link} to="/admintransferprimary-approved">Confirmed Requests</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
        </div>
   
    
   
    <div className='nit3'>Transfer Request - {btn==true ? "ICIN Accounts":"Other Bank Account"}</div>
      <table className="table table-bordered">
        <thead>
          <tr>
            {arr.map((e,i)=>
            
            <th key={i}>{e}</th>
            )}
           
          </tr>
        </thead>
        <tbody>
          {(userData !== null || userData !== undefined) ? currentItems.filter((t)=>t.isApproved == "false").map((e,j) => 
          
            <tr key={j}>
              <td>{j+1}</td>
              <td>{e?.userData1[0].username}</td>
              <td>{e?.userData1[0].first_name }</td>
              <td>{e?.userData1[0].last_name }</td>
           
              <td>{e?.userData1[0].email}</td>
              <td>{e?.userData1[0].mobile}</td>
              <td>{new Date(e.dateCreated).toLocaleString()}</td>
              <td>{e.transferType}</td>
              <td>${e.amount}</td>
              <td id='rtr'>
                <button
                 className='approveBtn'
                 onClick={()=>(disableBtn({id:e?._id,amount:e?.amount,recipientId:e?.recipientId}),setData(e?.recipientId))}
              
                >Approve</button>


                <button
                style={{background:"red"}}
                 className='approveBtn'
                 onClick={()=>(disableBtn({id:e?._id,amount:e?.amount,recipientId:e?.recipientId,isApproved:"cancel"}),setData(e?.recipientId))}
              
                >Reject</button>
                
              </td>
            </tr>
          ):null}
        </tbody>
      </table>
    
      
        
    <br/>
   


 
 










<AdminModelTransferRequest accountinfo={modelData}
                                      show={modalShow} 
                                      onHide={() => setModalShow(false)}/>







   
    

      
    
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
<div style={{position:"absolute",bottom:0,width:"100%"}}><BootFooter/></div>
</div>
)
}

export default AdminTransferRequests;

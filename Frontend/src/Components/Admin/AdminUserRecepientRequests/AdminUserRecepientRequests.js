import React,{useEffect,useState} from 'react'
import AdminModelTransferRequest from '../AdminModelTransferRequest/AdminModelTransferRequest'
import {Row,Col} from 'react-bootstrap'
import AdminNavBar from '../AdminNavBar/AdminNavBar'
import './AdminUserRecepientRequests.css'
import BootFooter from '../../Footer/BootFooter'
import axios from "axios"
import { useToasts } from 'react-toast-notifications';
import Pagination from 'react-js-pagination';
function AdminUserRecepientRequests() {
  const { addToast } = useToasts();
    let arr1 = [
        "Sr No",
        "User Name",
        "Email",
        "Account",
        "Account Number",
       
        "Action"
    
    ]
    const itemsPerPage = 12;
  const [activePage, setActivePage] = useState(1);
  const[data,setData]= useState([])
const[userData,setUserData]= useState([])
const[userAccountData,setUserAccountData]= useState([])


const [modalShow, setModalShow] = useState(false);
const[modelData,setModalData] = useState()

useEffect(() => {
    axios.get("http://localhost:4000/api/v1/users").then((res)=>setUserData(res.data.users)).catch((err)=>console.log(err))
    axios.get("http://localhost:4000/api/userRecepients").then((res)=>setData(res.data.filter((e)=>e.recipientType == "ICIN Bank"))).catch((err)=>console.log(err))
    axios.get("http://localhost:4000/api/userAccount").then((res)=>setUserAccountData(res.data)).catch((err)=>console.log(err))
    }, [])

    const indexOfLastItem = activePage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = data?.slice(indexOfFirstItem, indexOfLastItem);

console.log(currentItems);


let fun=async(e)=>{

if(e.isApproved == "cancel"){
  await axios.put(`http://localhost:4000/api/userRecepients/${e.new_update_id}`,{isApproved:"false"}).then((res)=> addToast("Rejected",{appearance:"error"})).catch((err)=>addToast("Request Failed",{appearance:"error"}))
  await  axios.get("http://localhost:4000/api/userRecepients").then((res)=>setData(res.data.filter((e)=>e.recipientType == "ICIN Bank"))).catch((err)=>console.log(err))
}else{
  await axios.put(`http://localhost:4000/api/userRecepients/${e.new_update_id}`,{isApproved:"true"}).then((res)=> addToast("Approved",{appearance:"success"})).catch((err)=>addToast("Request Failed",{appearance:"error"}))
  await  axios.get("http://localhost:4000/api/userRecepients").then((res)=>setData(res.data.filter((e)=>e.recipientType == "ICIN Bank"))).catch((err)=>console.log(err))
}

await  axios.get("http://localhost:4000/api/userRecepients").then((res)=>setData(res.data.filter((e)=>e.recipientType == "ICIN Bank"))).catch((err)=>console.log(err))

}
let newFun=(e)=>{
    setModalData(e)
    setModalShow(true)
}
const handlePageChange = (pageNumber) => {
  setActivePage(pageNumber);
  
};

return (
<div className='admintransfer-main-container'>
 <AdminNavBar/>



    
    
<div className="container">
<div className='nit1'>Add Recepients Request</div>
      <table className="table table-bordered">
        <thead>
          <tr>
            {arr1.map((e,i)=>
            
            <th key={i}>{e}</th>
            )}
           
          </tr>
        </thead>
        <tbody>
        {
            currentItems.filter((y)=>y.isApproved == "false").map((e,i)=>
          
            <tr key={i}>
              <td>{i+1}</td>
              <td>{userData.filter((j)=>j._id == e.userId)[0]?.first_name + " " + userData.filter((j)=>j._id == e.userId)[0]?.last_name}</td>
              <td>{userData.filter((j)=>j._id == e.userId)[0]?.email}</td>
              <td>{userAccountData.filter((l)=>l._id == e.recipientaccountId)[0]?.accounttype}</td>
           
              <td>{userAccountData.filter((l)=>l._id == e.recipientaccountId)[0]?.accountnumber}</td>
              <td id='rtr'>
                
                
                <button className='approveBtn' onClick={()=>fun({
                     new_update_id:e._id

                      })}>Approve</button>
                      
                      
                      <button className='approveBtn' style={{background:'red'}} onClick={()=>fun({
                     new_update_id:e._id,
                     isApproved:"cancel"

                      })}>Reject</button>  
                      
                      
                      </td>
              
            </tr>
          )}
        </tbody>
      </table>
    </div>

    <div className='paginationTransaferHistory'>
<Pagination
        activePage={activePage}
        itemsCountPerPage={itemsPerPage}
        totalItemsCount={userData.length}
        pageRangeDisplayed={5}
        onChange={handlePageChange}
        itemClass="page-item"
        linkClass="page-link"
      />

</div>

<div style={{position:"absolute",bottom:0,width:"100%"}}><BootFooter/></div>

</div>
)
}

export default AdminUserRecepientRequests;

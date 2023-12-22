import React,{useEffect,useState} from "react";
import "./AdminDepositeRequest.css";
import { Row, Col } from "react-bootstrap";
import AdminNavBar from "../AdminNavBar/AdminNavBar";
import BootFooter from "../../Footer/BootFooter";
import axios from "axios"
import { useToasts } from 'react-toast-notifications';
import Pagination from 'react-js-pagination';


function AdminDepositeRequest() {
  const { addToast } = useToasts();
  let arr1 = [
    "Sr No",
    "UserId",
    "First Name",
    "Last Name",
    "Email",
    "Account Type",
    "Account Number",
   "Amount",
    "Action"

]
const itemsPerPage = 12;
  const [activePage, setActivePage] = useState(1);



  const[data,setData]= useState([])
const[userData,setUserData]= useState([])
const[userAccountData,setUserAccountData]= useState([])

  useEffect(() => {
    axios.get("http://localhost:4000/api/userTransaction/adminUserTransaction/data").then((res)=>setData(res.data))
    }, [])
console.log(data);

    const indexOfLastItem = activePage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const final_data = data?.filter((y)=>y.isApproved == "false").filter((z)=>z.transactionType == "Deposit")
    const currentItems = final_data?.slice(indexOfFirstItem, indexOfLastItem);


    const fun=async(e)=>{


      const update={
        amount:parseInt(e.amount),
      }
      const approvedStatus = {
        isApproved:"true"
      }


      if(e.isApproved == "cancel"){
        await  axios.put(`http://localhost:4000/api/userTransaction/${e.userTransactionId}`,{isApproved:e.isApproved}).then((res)=>addToast("Rejected",{appearance:"error"}))
        await  axios.get("http://localhost:4000/api/userTransaction/adminUserTransaction/data").then((res)=>setData(res.data))
      }
      else{

        await  axios.put(`http://localhost:4000/api/userAccount/update/${e?.id+"-D"}`,update).then((res)=>console.log(res))
        await  axios.put(`http://localhost:4000/api/userTransaction/${e.userTransactionId}`,approvedStatus).then((res)=>addToast("Approved",{appearance:"success"}))
        await  axios.get("http://localhost:4000/api/userTransaction/adminUserTransaction/data").then((res)=>setData(res.data))
      }

    }
    const handlePageChange = (pageNumber) => {
      setActivePage(pageNumber);
      
    };


console.log(data);
   
  return (
    <div>
      <AdminNavBar />
      <div className="container">
<div className='nit1'>Deposit Request</div>
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
            currentItems?.map((e,i)=>
          
            <tr key={i}>
              <td>{i+1}</td>
              <td>{e?.users[0].username}</td>
              <td>{e?.users[0].first_name}</td>
              <td>{e?.users[0].last_name}</td>
           
              <td>{e?.users[0].email}</td>
              <td>{e?.userAccounts.accounttype}</td>
              <td>{e?.userAccounts.accountnumber}</td>
              <td>${e?.amount}</td>
              <td id="rtr">
                
                
                <button className='approveBtn' onClick={()=>fun({
                     id:e.accountId,
                      userTransactionId:e._id,
                      amount:e.amount

                      })}>Approve</button>
                      
                      
                      <button className='approveBtn' style={{backgroundColor:"red"}}  onClick={()=>fun({
                     id:e.accountId,
                      userTransactionId:e._id,
                      amount:e.amount,
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
        totalItemsCount={final_data.length}
        pageRangeDisplayed={2}
        onChange={handlePageChange}
        itemClass="page-item"
        linkClass="page-link"
      />

</div>
<div style={{position:"absolute",bottom:0,width:"100%"}}><BootFooter/></div>
    </div>
  );
}

export default AdminDepositeRequest;

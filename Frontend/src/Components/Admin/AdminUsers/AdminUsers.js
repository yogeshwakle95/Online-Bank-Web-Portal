import React, { useEffect, useState } from 'react'
import AdminNavBar from '../AdminNavBar/AdminNavBar'
import './AdminUsers.css'
import {Row,Col} from 'react-bootstrap'
import axios from 'axios'
import BootFooter from '../../Footer/BootFooter'
import "bootstrap/dist/css/bootstrap.min.css";
import { useToasts } from 'react-toast-notifications';
import Pagination from 'react-js-pagination';

function AdminUsers() {
  const { addToast } = useToasts();
    let arr = [
        "Sr No",
        "UserId",
        "First Name",
        "Last Name",
        "Email",
        "Mobile",
        
        "Primary Account",
        "Savings Account",
        "Action"

    ]

    const itemsPerPage = 12;
  const [activePage, setActivePage] = useState(1);

  
    const[users,setUsers] = useState([])
    
    const[input1,setInput1] = useState('')



    
useEffect(()=>{
  axios.get("http://localhost:4000/api/v1/allUserData/users")
  .then((res)=>setUsers(res.data?.filter((e)=>e.role == "user")))
  .catch((err)=>console.log(err))
},[])
   



    
    

const indexOfLastItem = activePage * itemsPerPage;
const indexOfFirstItem = indexOfLastItem - itemsPerPage;
const currentItems = users?.slice(indexOfFirstItem, indexOfLastItem);

const disableBtn=async(e)=>{



  var update = {}



//  if(e.disable_status == true){
//   update = {
//     disable_status:false
//   }

// }
//   else{
//  update = {
//       disable_status:true
//     }
  
//   }

var update = {
  disable_status:JSON.stringify(e.disable_status === "false"? true : false)
}
console.log(e.disable_status);
 console.log(update);
 
 
 await axios.put(`http://localhost:4000/api/v1/users/${e.id}`,update).then((res)=> addToast(update.disable_status == true ?`User - Blocked Successful`:`UnBlocked Successful`,{appearance:"success"}))
  await  axios.get("http://localhost:4000/api/v1/allUserData/users").then((res)=>setUsers(res.data?.filter((e)=>e.role == "user"))).catch((err)=>console.log(err))
 
}


const handlePageChange = (pageNumber) => {
  setActivePage(pageNumber);
  
};

  return (
    <div>
      <AdminNavBar />

      
  
<div className="container">
<div className='nit1'>Enable / Disable Users</div>
      <table className="table table-bordered">
        <thead>
          <tr>
            {arr.map((e,i)=>
            
            <th key={i}>{e}</th>
            )}
           
          </tr>
        </thead>
        <tbody>
          {(users !== null || users !== undefined) ? currentItems.map((e,j) => 
            <tr key={j}>
              <td>{j+1}</td>
              <td>{e.username}</td>
              <td>{e.first_name }</td>
              <td>{e.last_name}</td>
              <td>{e.email}</td>
              <td>{e.mobile}</td>
              <td>{e.userData[0]?.accounttype}</td>
              <td>{e.userData[1]?.accounttype}</td>
              <td style={{display:"flex",justifyContent:"center"}}><div className="form-check form-switch">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="flexSwitchCheckDefault"
                 onChange={()=>disableBtn({disable_status:e.disable_status,id:e._id})}
                 checked={(e.disable_status === 'true')}
                />
                {/* <button onClick={()=>disableBtn()}></button> */}
              </div> </td>
            </tr>
          ):null}
        </tbody>
      </table>
    
      </div>



      <div className='paginationTransaferHistory'>
<Pagination
        activePage={activePage}
        itemsCountPerPage={itemsPerPage}
        totalItemsCount={users.length}
        pageRangeDisplayed={2}
        onChange={handlePageChange}
        itemClass="page-item"
        linkClass="page-link"
      />

</div>



      <div style={{position:"absolute",bottom:"0",width:"100%"}}>
      <BootFooter/>

      </div>
      

    </div>
  );
}

export default AdminUsers
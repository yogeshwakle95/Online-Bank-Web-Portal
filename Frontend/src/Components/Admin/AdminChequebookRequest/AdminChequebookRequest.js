import axios from 'axios'
import React,{useEffect,useState} from 'react'
import AdminNavBar from '../AdminNavBar/AdminNavBar'
import {Row,Col} from 'react-bootstrap'
import AdminModelChequebookRequest from '../AdminModelChequebookRequest/AdminModelChequebookRequest'
import BootFooter from '../../Footer/BootFooter'
import { useToasts } from 'react-toast-notifications';
import Pagination from 'react-js-pagination';
function AdminChequebookRequest() {
  const { addToast } = useToasts();
const date = new Date()
  let arr2 = [
    "Sr No",
    "UserId",
    "First Name",
    "Last Name",
    "Email",
    "Mobile",
    
    "Account Type",
    "Description",
    "Action"

]

const itemsPerPage = 12;
  const [activePage, setActivePage] = useState(1);

const [modalShow, setModalShow] = useState(false);
const[data,setData]= useState([])

const[btn,setBtn] = useState(true)
const[modelData,setModalData] = useState()

useEffect(() => {
   
    axios.get("http://localhost:4000/api/chequebook/chequebookall/data").then((res)=>setData(res.data))
    }, [])

   console.log(data);

    const indexOfLastItem = activePage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = data?.slice(indexOfFirstItem, indexOfLastItem);
    
const disableBtn=async(e)=>{
  const update ={}
if(e.isApproved == "cancel"){
 const update={
    dateApproved:date,
    approvedBy:"admin",
    isApproved:"cancel"
  }
  await axios.put(`http://localhost:4000/api/chequebook/${e?.id}`,update).then((res)=> addToast("Rejected",{appearance:"error"})).catch((err)=>addToast("Request Failed",{appearance:"error"}))
  await axios.get("http://localhost:4000/api/chequebook/chequebookall/data").then((res)=>setData(res.data))
}
else{
  const update={
    dateApproved:date,
    approvedBy:"admin",
    isApproved:"true"
  }
  await axios.put(`http://localhost:4000/api/chequebook/${e?.id}`,update).then((res)=> addToast("Approved",{appearance:"success"})).catch((err)=>addToast("Request Failed",{appearance:"error"}))
  await axios.get("http://localhost:4000/api/chequebook/chequebookall/data").then((res)=>setData(res.data))
}

await axios.get("http://localhost:4000/api/chequebook/chequebookall/data").then((res)=>setData(res.data))
}
const handlePageChange = (pageNumber) => {
  setActivePage(pageNumber);
  
};
  return (
    <div>
        <AdminNavBar/>
       
    
  
    
    



    <div className="container">
    <div className='nit1'>Chequebook Request - Primary/Savings</div>
      <table className="table table-bordered">
        <thead>
          <tr>
            {arr2.map((e,i)=>
            
            <th key={i}>{e}</th>
            )}
           
          </tr>
        </thead>
        <tbody>
          {(data !== null || data !== undefined) ? currentItems.filter((t)=>t.isApproved == "false").map((e,j) => 
          
            <tr key={j}>
              <td>{j+1}</td>
              <td>{e?.userData[0].username}</td>
              <td>{e?.userData[0].first_name }</td>
              <td>{e?.userData[0].last_name }</td>
           
              <td>{e?.userData[0].email}</td>
              <td>{e?.userData[0].mobile}</td>
              <td>{e?.transactionType}</td>
              <td>{e?.description}</td>
              <td id='rtr' >
               
                
                
                <button
                 className='approveBtn'
                 onClick={()=>(disableBtn({id:e?._id,}))}
              
                >Approve</button>
            
             
              
             
              <button
             style={{background:"red"}}
                 className='approveBtn'
                 onClick={()=>(disableBtn({id:e?._id,isApproved:"cancel"}))}
              
                >Reject</button>
             
             
               </td>
            </tr>
          ):null}
        </tbody>
      </table>
    
      
      







  
   

    
<AdminModelChequebookRequest accountinfo={modelData}
                                      show={modalShow} 
                                      onHide={() => setModalShow(false)}/>







    

  
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

export default AdminChequebookRequest
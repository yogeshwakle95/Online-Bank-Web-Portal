import React, { useEffect, useState } from 'react'
import BootNavBar from '../../BootNavbar/BootNavBar'
import BootFooter from '../../Footer/BootFooter'
import { Link } from 'react-router-dom'
import axios from 'axios'
import Pagination from 'react-js-pagination';
function ChequebookHistory() {
    let arr = [
        "Sr No",
        "Account Type",
      "Description",
       "Date",
        
        "Status"
    
    ]
    const id = localStorage.getItem("obb")?.split(',')[0]?.split('"')[1]
   
    const[data,setData]=useState([])
  
    const date = new Date();  
    const itemsPerPage = 12;
    const [activePage, setActivePage] = useState(1);

    useEffect(()=>{
        axios.get(`http://localhost:4000/api/chequebook/search/${id}`).then((res)=>setData(res.data)).catch((err)=>console.log(err))
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

                <div className='iit2_btn'><Link className='iit2_btn_link' to={"/chequebook-request"}><i class="fa fa-arrow-left" id='iit2_icon' ></i> Back</Link></div>
                <div className='iit1'>Chequebook History</div>
                <table className="table table-bordered">
                <thead>
                <tr>
                {arr.map((e,i)=>
                
                <th key={i}>{e}</th>
                )}
                
                </tr>
                </thead>
                <tbody>
                {(data !== null || data !== undefined) ? currentItems.map((e,j) => 

                <tr key={j}>
                    <td>{j+1}</td>
                    <td>{e?.transactionType}</td>
                    <td>{e?.description}</td>
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


                <div style={{position:"absolute",bottom:"0px",width:"100%"}}><BootFooter/></div>
    </div>
  )
}

export default ChequebookHistory
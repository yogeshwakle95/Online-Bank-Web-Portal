import React,{useState} from 'react'
import { Link } from 'react-router-dom'
import BootNavBar from '../../BootNavbar/BootNavBar'
import '../TransactionType/TransactionType.css'
import BootFooter from '../../Footer/BootFooter'
import BlockModal from '../../BlockModal/BlockModal';
function TransactionType({modalShow}) {
 
  const[selectOption,setSelectOption] = useState("Primary Account")
 
  return (
    <div>
      <BootNavBar/>
      <BlockModal
        backdrop="static"
        show={modalShow == undefined ? false :JSON.parse(modalShow)}
      />
      <div className='main-container122'>
        <div className='transType-container'>  

        <div className='transType-container-sub'>
          <div className='transType-head'>Kindly, select the account type</div>
          <div className='transType-body'>
            <select onChange={(e)=>setSelectOption(e.target.value)} style={{width:"100%"}}>
                            <option value={"Primary Account"}>Primary Account</option>
                            <option value={"Saving Account"}>Saving Account</option>
                        </select>
            </div>
        </div>
           
           <div>
           <div className='transType-btn-container'><Link  className='transType-btn' to={selectOption == "Primary Account"? '/transaction-primary' :'/transaction-savings'}  >View History</Link ></div>
           
           </div>

             </div>
           
        </div>
        <BootFooter/>
      </div>
      
      
  )
}

export default TransactionType
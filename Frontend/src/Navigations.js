import React, { useEffect,useState } from 'react'
import {Routes,Route,Outlet,Navigate, useNavigate} from 'react-router-dom'



import AdminSignInPage from './Components/AdminSignInPage/AdminSignInPage';


import Profile from './Components/Profile/Profile';

import Deposit from './Components/Deposit/Deposit';
import Withdrawl from './Components/Withdrawl/Withdrawl';
import ChequebookRequest from './Components/Services/ChequebookRequest';
import Dashboard from './Components/Dashboard/Dashboard';
import Transfer from './Components/Transfer1/Transfer';
import DespositeChild from './Components//Transfer1/DepositeMoney/Child/DespositeChild';
import AddRecepient from './Components/Transfer1/DepositeMoney/AddRecepient';
import AdminDashboard from './Components/Admin/Dashboard/AdminDashboard'
import AdminChequebookRequest from './Components/Admin/AdminChequebookRequest/AdminChequebookRequest'
import AdminDepositeRequest from './Components/Admin/AdminDepositeRequest/AdminDepositeRequest'
import AdminUsers from './Components/Admin/AdminUsers/AdminUsers'
import AdminTransferRequests from './Components/Admin/AdminTransferRequests/AdminTransferRequests';
import AdminUserRecepientRequests from './Components/Admin/AdminUserRecepientRequests/AdminUserRecepientRequests'

import Signup from './Components/SignUp/Signup';
import SignInPage from './Components/SignInPage/SignInPage';

import PrimaryTransaction from './Components/TransactionHistory/PrimaryTransaction/PrimaryTransaction'
import SavingsTransaction from './Components/TransactionHistory/SavingsTransaction/SavingsTransaction'
import TransactionType from './Components/TransactionHistory/TransactionType/TransactionType';
import AdminRecepientApproved from './Components/Admin/AdminUserRecepientRequests/AdminUserRecepientApproved/AdminRecepientApproved';
import AdminTransferPrimaryApprove from './Components/Admin/AdminTransferRequests/AdminTransferPrimaryApprove/AdminTransferPrimaryApprove';
import AdminTransferSavingsApprove from './Components/Admin/AdminTransferRequests/AdminTransferSavingsApprove/AdminTransferSavingsApprove';
import AdminWithdrawlRequest from './Components/Admin/AdminWithdrawlRequest/AdminWithdrawlRequest';
import axios from 'axios';
import TransferMoney from './Components/Transfer2/TransferMoney/TransferMoney';
import AddRecepients from './Components/Transfer2/AddRecepients/AddRecepients';
import Loader from './Components/Loader/Loader';
import ChangePassword from './Components/ChangePassword/ChangePassword';
import ForgetPassword from "./Components/ForgetPassword/ForgetPassword";
import ResetPassword from "./Components/ResetPassword/ResetPassword";
import DepositTransactionHistory from './Components/Deposit/DepositTransactionHistory/DepositTransactionHistory';
import WithdrawlTransactionHistory from './Components/Withdrawl/WithdrawlTransactionHistory/WithdrawlTransactionHistory'

import TransferTransaction from './Components/Transfer2/TransferTransaction/TransferTransaction'
import ChequebookHistory from './Components/Services/ChequebookHistory/ChequebookHistory';
function Navigations() {
  const id = localStorage.getItem("obb")?.split(',')[0]?.split('"')[1]
  const role = localStorage.getItem("obb")?.split(',')[2]?.split('"')[0]
  const [modalShow, setModalShow] = useState(false);
  const navigate = useNavigate();
const authToken =( localStorage.getItem("obb")?.split(',')[1])
  const ProtectedCandidate=()=>{
    if(authToken !== undefined ){
      if(role == "user"){
        return <Outlet/>
      }
      
    }
    else{
      return <Navigate to={'/signin'}/>
    }
  }

  const ProtectedAdmin=()=>{
    if(authToken !== undefined ){
      if(role == "admin"){
        return <Outlet/>
      }
      
    }
    else{
      return <Navigate to={'/signin'}/>
    }
    
  }
 //?.filter((t)=>t.role == "user").filter((e)=>e._id == id)[0]?.disable_status
  useEffect(()=>{
    axios.get(`http://localhost:4000/api/v1/users/${id}`).then((res)=>setModalShow(res.data?.disable_status))
  },[])
  
  return (
    <div>
         <Routes>
         
            

           
            
        {authToken == undefined&&<Route  path="/signin" element={ <SignInPage /> } /> }
        {authToken == undefined && <Route exact path="/" element={ <SignInPage /> } /> }
        {authToken == undefined  &&<Route  path="/signup" element={ <Signup /> } /> }
        {authToken == undefined  &&<Route path="/forgetpassword" element={<ForgetPassword />} />}

        {authToken == undefined  && <Route
              path="/api/v1/password/reset/:token"
              element={<ResetPassword />}
            /> }

        <Route path='/redirecting' element={<Loader  />}/>
        
         <Route  element={ <ProtectedAdmin /> } >

            <Route  exact path="/" element={ <SignInPage /> } />
            <Route  path="/signup" element={ <Signup /> } />
            <Route  path="/signin" element={ <SignInPage /> } />


            </Route>


             
      <Route element={<ProtectedCandidate/>}>

            <Route exact path="/dashboard" element={<Dashboard  modalShow = {modalShow} setModalShow={setModalShow} />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/changepassword" element={<ChangePassword />} />
            <Route path="/transfer" element={<Transfer  modalShow = {modalShow} />} />
            <Route path="/deposit" element={<Deposit  modalShow = {modalShow} />} />
            <Route path="/depositTransaction" element={<DepositTransactionHistory  modalShow = {modalShow} />} />
            
            
            <Route path="/withdrawl" element={<Withdrawl   modalShow = {modalShow}/>} />
            <Route path="/withdrawlTransaction" element={<WithdrawlTransactionHistory  modalShow = {modalShow} />} />

            <Route path="/add" element={<AddRecepient  modalShow = {modalShow}/>} />

            <Route path="/chequebook-request" element={<ChequebookRequest  modalShow = {modalShow} />} />

            <Route path="/chequebookTransaction" element={<ChequebookHistory  modalShow = {modalShow} />} />


            <Route path='/transaction-type' element={<TransactionType  modalShow = {modalShow}/>}/>
            {/* <Route path='/transaction-primary' element={<PrimaryTransaction  modalShow = {modalShow}/>}/>
            <Route path='/transaction-savings' element={<SavingsTransaction  modalShow = {modalShow}/>}/> */}
            <Route path='/transferMoney' element={<TransferMoney  modalShow = {modalShow}/>}/>
            <Route path='/addRecepients' element={<AddRecepients  modalShow = {modalShow}/>}/>
            <Route path='/transferTransaction' element={<TransferTransaction  modalShow = {modalShow}/>}/>
           
          
           
          
      </Route>
            

           

           
            </Routes>
    
            <Routes>
            <Route element={<ProtectedAdmin/>}>

            <Route path="/admin-users" element={<AdminUsers />} />

            <Route path='/adminrecepient-approved' element={<AdminRecepientApproved />}/>
            <Route path='/admintransferprimary-approved' element={<AdminTransferPrimaryApprove />}/>
            <Route path='/admintransfersavings-approved' element={<AdminTransferSavingsApprove />}/>

            <Route path="/admin-dashboard" element={<AdminDashboard />} />
            
            <Route path="/admin-withdrawl" element={<AdminWithdrawlRequest />} />
            <Route path="/admin-deposit" element={<AdminDepositeRequest />} />
            <Route path="/admin_user_recepient_requests" element={<AdminUserRecepientRequests />} />
            <Route path="/admin_transfer_requests" element={<AdminTransferRequests />} />
            <Route path="/admin-chequebook-request" element={<AdminChequebookRequest />} />


         </Route>
         
            </Routes>



      
      
    </div>
  )
}

export default Navigations
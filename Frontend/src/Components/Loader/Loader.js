import React,{useEffect, useRef, useState} from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Loader.css";
import {TrinitySpinner } from 'loading-animations-react';

const Loader = () => {
  const navigate = useNavigate();
  


 
const[value1,setValue1] = useState(true)
const[value2,setValue2] = useState(true)


//primary
  const accounttype = "primary";
  const userId = JSON.parse(localStorage.getItem("sign"));
 
  const accountnumber1 = parseInt(
    "9999" + Math.floor(Math.random() * 9000 + 1000)
  );

  const accountnumber2 = parseInt(
    "8888" + Math.floor(Math.random() * 9000 + 1000)
  );

  
  const post1 = {
    userId:userId,
  accounttype:"Primary Account",
  accountnumber:`${accountnumber1}`,
  amount:"100"
  
  }
  const post2 = {
    userId:userId,
    accounttype:"Savings Account",
    accountnumber:`${accountnumber2}`,
    amount:"100"
  }
 
  


 
var flag = true
var count = 0
  
setTimeout(()=>{ {value1 == true && value2 == true ? navigate("/signin")  : navigate("/signup")} },2000)


    useEffect(()=>{
   

    if(flag == true && userId !== null){
          count++
          console.log( count + " time");
           axios.post("http://localhost:4000/api/userAccount",post1).then((res)=>console.log(res)).catch((err)=>setValue1(false))


           axios.post("http://localhost:4000/api/userAccount",post2).then((res)=>console.log(res)).catch((err)=>setValue2(false))


          flag = !flag

          
          
        }
        
    },[])

  
  return <div  >
    
    <div >
        <div className="spinner">
       
        <TrinitySpinner color="black" />
        
        </div>
        <div>Please wait while we are creating your account</div>
    </div>
  </div>;
};

export default Loader;

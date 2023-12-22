import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import  './NavBar.css'


function NavBar() {
const arr = [
    
    {
        component: "Dashboard",
        link:"/dashboard",
        dropdown:false,
    },
    {
        component: "Account",
        link:"/profile",
        dropdown:false,
    },
    {
        component: "Transfer",
        link:"/transfer",
        dropdown:false,
    },
    {
        component: "Services",
        link:"#",
        dropdown:true,
    },
   
]

const[a,setA] = useState("none")
let fun=()=>{
 setA("block")

}
  return (
    <div>
      <ul className="nav-main-container">
        <div className="logo">
          {" "}
          <li> ICIN </li>
        </div>

        <div className="components">
          {arr.map((e, i) => (
            <li key={i} className="list">
              <Link className="" to={`${e.link}`}>
                {e.component}
              </Link>
             {e.dropdown && <div className='drop'><Link to='/chequebook-request'>Check Book Request</Link></div>}
            </li>
          ))}
        </div>

        
        

        {/* <div className="components1" style={{ display: `${a}` }}>
          {arr.map((e, i) => (
            <li key={i} className="list">
              <a className="alist" href="#home">
                {e.component}
              </a>
              
            </li>
          ))}
        </div> */}

        <div className="profile">
          <li style={{ float: "right" }}>
            {" "}
            <Link className="active" to="/">
              <i className="fa fa-user"></i>
              {"  "}
            </Link>
          </li>
        </div>
        <div className="listIcon">
          <a href="#" onClick={fun}>
            {" "}
            <i className="fa fa-list"></i>
          </a>
          <div></div>
        </div>
      </ul>
    </div>
  );
}

export default NavBar
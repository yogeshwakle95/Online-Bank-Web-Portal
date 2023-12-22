import React, { useEffect, useState } from 'react'
import './AdminNavbar.css'
import { NavLink,Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';

import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import axios from 'axios';
import { useToasts } from 'react-toast-notifications';
import {useNavigate} from "react-router-dom"
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Badge from '@mui/material/Badge';
import Avatar from '@mui/material/Avatar';
import { styled } from '@mui/material/styles';
function AdminNavBar() {
  const navigate = useNavigate();
  const { addToast } = useToasts();
  const[data,setData]=useState([])
  const id = localStorage.getItem("obb")?.split(',')[0]?.split('"')[1]


  useEffect(()=>{
    axios.get(`http://localhost:4000/api/v1/users/${id}`).then((res)=>setData(res.data))
  },[])



  const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
      backgroundColor: '#44b700',
      color: '#44b700',
      boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
      '&::after': {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        borderRadius: '50%',
        animation: 'ripple 1.2s infinite ease-in-out',
        border: '1px solid currentColor',
        content: '""',
      },
    },
    '@keyframes ripple': {
      '0%': {
        transform: 'scale(.8)',
        opacity: 1,
      },
      '100%': {
        transform: 'scale(2.4)',
        opacity: 0,
      },
    },
  }));
  const Logout = async() => {
    try{
      const res= await axios.get("http://localhost:4000/api/v1/logout");
      addToast("Logout Successfully", { appearance: "success" });
      localStorage.removeItem("obb")
      console.log(res.success)
      navigate("/"  )
    }
    catch(err)
    {
      addToast(err.response.data.error, { appearance: "error" });

     
    }
  }



  return (
    <div className='AdminNavBar-container'>
       <Navbar bg="dark" expand="lg" variant="dark">
      <Container fluid>
        <Navbar.Brand href="#" style={{marginLeft:"20px"}} > <strong className='logo1'>ICIN</strong><small>Bank</small></Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            <Nav.Link as={NavLink}  to={"/admin-dashboard"} >Dashboard</Nav.Link>
            <Nav.Link as={NavLink}  to="/admin-users">Users</Nav.Link>
            <NavDropdown title="Requests" id="navbarScrollingDropdown">
              <NavDropdown.Item as={Link} to="/admin_user_recepient_requests">Recipient Requests</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/admin_transfer_requests">Transfer Requests</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/admin-withdrawl">
                Withdrawal Requests
              </NavDropdown.Item>
              
              <NavDropdown.Item as={Link} to="/admin-deposit">
                Deposit Requests
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/admin-chequebook-request">
                Chequebook Requests
              </NavDropdown.Item>
            </NavDropdown>
            
          </Nav>
          <div style={{color:"white", paddingRight:"15px"}}>Hello, {data?.username}</div>
          <Nav>
            <StyledBadge
                    overlap="circular"
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                    variant="dot"
                  >
                    <Avatar alt="avatar" />
                  </StyledBadge>
            </Nav>
                      {/* logout section */}
                      <Nav>
                        <div>
                    <DropdownButton
                      align={{ lg: 'end' }}        
                      id="dropdown-menu-align-responsive-1"
                    >
                      
                      <Dropdown.Item eventKey="2" onClick={Logout}>Logout</Dropdown.Item>
                    </DropdownButton>
                  </div>
                      </Nav>

        </Navbar.Collapse>
      </Container>
    </Navbar>
    </div>
  )
}

export default AdminNavBar
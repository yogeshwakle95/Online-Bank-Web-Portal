import React, { useEffect, useState } from 'react'

import { NavLink,Link ,useNavigate} from 'react-router-dom';

import Container from 'react-bootstrap/Container';
import { useToasts } from 'react-toast-notifications';
import axios from 'axios';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Badge from '@mui/material/Badge';
import Avatar from '@mui/material/Avatar';
import { styled } from '@mui/material/styles';


function BootNavBar() {
  const[data,setData]=useState([])
  const navigate= useNavigate();
  const { addToast } = useToasts();
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
          
                console.log(err);
              }
            }


  return (
    <div>
      <Navbar bg="dark" expand="lg" variant="dark">
      <Container fluid>
        <Navbar.Brand href="#" style={{marginLeft:"20px"}} > <strong className='logo1'>ICIN</strong><small>Bank</small></Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
          id='nav11'
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
    
           <Nav.Link as={NavLink}  to={"/dashboard"} >Dashboard</Nav.Link>

<Nav.Link as={NavLink}  to="/profile">Account</Nav.Link>



<NavDropdown title="Transfer" id="navbarScrollingDropdown"  >
 
  
<NavDropdown.Item as={Link}   to="/transferMoney">Transfer Money</NavDropdown.Item>
<NavDropdown.Item as={Link}   to="/addRecepients">Add Recipients</NavDropdown.Item>
</NavDropdown>

<NavDropdown title="Services" id="navbarScrollingDropdown"  >
 
  
  <NavDropdown.Item as={Link} to="/chequebook-request">
  Check Book Request
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
                    
                      <Nav>
                        <div>
                    <DropdownButton
                      align={{ lg: 'end' }}        
                      id="dropdown-menu-align-responsive-1"
                    >
                      {/* <Dropdown.Item eventKey="1"><Link to ="/changepassword" style={{textDecoration:"none", color:"black"}}>Change Password</Link></Dropdown.Item>
                       */}
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

export default BootNavBar
import React from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Link, useNavigate } from 'react-router-dom';
function BlockModal(props) {
  const navigate= useNavigate();
  let fun=()=>{
    localStorage.removeItem("obb")
    navigate("/signin")
      }
  return (
    <div>
        <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header >
        <Modal.Title id="contained-modal-title-vcenter">
          Blocked
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
      
        <p>
          This account has been Temporarily blocked,
          Kindly, contact to admin.
        </p>
      </Modal.Body>
      <Modal.Footer>
      <Button as={Link} to={'/profile'}>Go to profile</Button>
        <Button as={Link} to={'/signin'} onClick={fun}>Sign Out</Button>
      </Modal.Footer>
    </Modal>
  
    </div>
  )
}

export default BlockModal 
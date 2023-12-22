import React from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import './AdminModelTransferRequest.css'
let AdminModelTransferRequest=(props)=> {
  
  return (
    <div>
         <Modal
     {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      
      <Modal.Body>
       <div className='model-main-container'>
       <div>
        <h4>Requested From </h4>
        <p>
        Name : - {props.accountinfo?.Rfirst_name} {props.accountinfo?.Rlast_name}<br/>
        Primary Account No :- {props.accountinfo?.Rprimary_account_number}<br/>
        Savings Account No :- {props.accountinfo?.Rsavings_account_number}<br/>
        </p>
        </div>
        <div>
        <h4>Recepient Account </h4>
        <p>
        Name : - {props.accountinfo?.Ufirst_name} {props.accountinfo?.Ulast_name}<br/>
        Primary Account No :- {props.accountinfo?.Uprimary_account_number}<br/>
        Savings Account No :- {props.accountinfo?.Usavings_account_number}<br/>
        </p>
        </div>
       </div>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
    </div>
  )
}

export default AdminModelTransferRequest
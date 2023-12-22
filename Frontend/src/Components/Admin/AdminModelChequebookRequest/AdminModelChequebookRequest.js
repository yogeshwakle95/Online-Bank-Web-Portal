import React from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function AdminModelChequebookRequest(props) {
  return (
    <div>
        <div>
         <Modal
     {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      
      <Modal.Body>
       <div className='model-main-container1'>
       
        <div>
        <h4>Account Info </h4>
        <p>
        Name : - {props.accountinfo?.Ufirst_name} {props.accountinfo?.Ulast_name}<br/>
        Primary Account No :- {props.accountinfo?.Uprimary_account_number}<br/>
        Savings Account No :- {props.accountinfo?.Usavings_account_number}<br/>
        Description :- {props.accountinfo?.description}<br/>
        Date :- {props.accountinfo?.date}<br/>
        </p>
        </div>
       </div>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
    </div>
    </div>
  )
}

export default AdminModelChequebookRequest
import React from 'react'

import DepositeMoney from './DepositeMoney/DepositeMoney'
import BootFooter from '../Footer/BootFooter'
import BlockModal from '../BlockModal/BlockModal';
function Transfer({modalShow}) {
  return (
    <div>
     <BlockModal
        backdrop="static"
        show={modalShow == undefined ? false :JSON.parse(modalShow)}
      />
      <DepositeMoney/>
      <BootFooter/>
    </div>
  )
}

export default Transfer
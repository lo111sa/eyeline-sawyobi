import * as React from 'react'
import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import { useModalStore } from '../store/modalStore'
import { DialogContentText } from '@mui/material'

const Modal = ({ title, children }) => {
  const modal = useModalStore()
  return (
    <Dialog open={modal.isOpen} scroll={'paper'} onClose={modal.closeModal}>
      <DialogTitle className="border border-b">{title}</DialogTitle>
      <div className="">
        <DialogContent>{children}</DialogContent>
      </div>
    </Dialog>
  )
}

export default Modal

import * as React from 'react'
import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import { useModalStore } from '../store/ModalStore'

const Modal = ({ title, children }) => {
  const modal = useModalStore()
  return (
    <Dialog open={modal.isOpen} onClose={modal.closeModal}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        {/* <DialogContentText>Text</DialogContentText> */}
        {children}
      </DialogContent>
    </Dialog>
  )
}

export default Modal

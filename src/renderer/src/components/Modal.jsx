import * as React from 'react'
import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import { useModalStore } from '../store/modalStore'
import { Box, DialogContentText, Typography } from '@mui/material'
import Modal1 from '@mui/material/Modal'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  maxWidth: '90%',
  maxHeight: '90%',
  overflow: 'auto',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4
}
const Modal = ({ title, children }) => {
  const modal = useModalStore()
  return (
    /* <Dialog open={modal.isOpen} scroll={'paper'} onClose={modal.closeModal} fullWidth>
      <DialogTitle className="border border-b">{title}</DialogTitle>
      <div className="">
        <DialogContent>{children}</DialogContent>
      </div>
    </Dialog>  */
    <Modal1
      open={modal.isOpen}
      onClose={modal.closeModal}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          {title}
        </Typography>
        {children}
      </Box>
    </Modal1>
  )
}

export default Modal

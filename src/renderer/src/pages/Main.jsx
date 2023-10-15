import React, { useEffect, useState } from 'react'
import MainTable from '../components/MainTable'
import { Button, TextField } from '@mui/material'
import { useModalStore } from '../store/ModalStore'
import Modal from '../components/Modal'
import AddProductForm from '../components/AddProductForm'

const Main = () => {
  const modal = useModalStore()
  const [text, setText] = useState('')
  const [data, setData] = useState([])

  const ipcRenderer = window.ipcRenderer

  useEffect(() => {
    const fetchProducts = () => {
      ipcRenderer.send('send', text)
    }
    fetchProducts()
    ipcRenderer.on('send', (res) => {
      setData(res)
    })
  }, [text])
 
  return (
    <div className="flex flex-col gap-2 p-3">
      <TextField
        id="outlined-basic"
        label="ძიება"
        variant="outlined"
        size="small"
        onChange={(e) => setText(e.target.value)}
        className="w-1/2"
      />

      <MainTable data={data} />
      <Modal title={'ახალი პროდუქტის დამატება'}>
        <AddProductForm/>
      </Modal>
    </div>
  )
}

export default Main

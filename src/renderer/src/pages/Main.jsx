import React, { useEffect, useState } from 'react'
import MainTable from '../components/MainTable'
import { Button, TextField } from '@mui/material'
import { useModalStore } from '../store/modalStore'
import Modal from '../components/Modal'
import AddProductForm from '../components/AddProductForm'
import { useProductsStore } from '../store/productsStore'

const Main = () => {
  const modal = useModalStore()
  const products = useProductsStore()
  const [text, setText] = useState('')
  const [modalType, setModalType] = useState('received')

  useEffect(() => {
    products.fetchProducts(text)
  }, [text])

  return (
    <div className="flex w-full border rounded-md shadow">
      <div className="flex flex-col w-full gap-2 p-3 overflow-">
        <TextField
          id="outlined-basic"
          label="ძიება"
          variant="outlined"
          size="small"
          onChange={(e) => setText(e.target.value)}
          className="w-1/2"
        />

        <MainTable data={products.data} />
      </div>
      {modal.modalType === 'add-product' && (
        <Modal title={'ახალი პროდუქტის დამატება'}>
          <AddProductForm />
        </Modal>
      )}
    </div>
  )
}

export default Main

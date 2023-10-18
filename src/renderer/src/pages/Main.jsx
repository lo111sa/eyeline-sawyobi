import React, { useEffect, useState } from 'react'
import MainTable from '../components/MainTable'
import { Button, MenuItem, Select, TextField } from '@mui/material'
import { useModalStore } from '../store/modalStore'
import Modal from '../components/Modal'
import AddProductForm from '../components/AddProductForm'
import { useProductsStore } from '../store/productsStore'

const Main = () => {
  const modal = useModalStore()
  const products = useProductsStore()
  const [searchText, setSearchText] = useState('')
  const [modalType, setModalType] = useState('received')

  useEffect(() => {
    products.fetchProducts(searchText)
  }, [searchText])

  return (
    <div className="flex w-full border rounded-md shadow">
      <div className="flex flex-col w-full gap-2 p-3 overflow-">
        <TextField
          value={searchText}
          id="outlined-basic"
          label="ძიება"
          variant="outlined"
          size="small"
          onChange={(e) => setSearchText(e.target.value)}
          className="w-1/2"
        />

        <MainTable data={products.data} searchText={searchText} />
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

import { Button, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useModalStore } from '../store/modalStore'
import { useProductsStore } from '../store/productsStore'

const AddProductForm = () => {
  const modal = useModalStore()
  const products = useProductsStore()
  const [name, setName] = useState('')
  const [count, setCount] = useState(0)

  const onSubmit = (e) => {
    e.preventDefault()

    const data = {
      name,
      count
    }
    products.addProduct(data)
    setName('')
    setCount(0)
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-4 py-2">
      <TextField
        value={name}
        id="outlined-basic"
        label="დასახელება"
        variant="outlined"
        size="small"
        onChange={(e) => setName(e.target.value)}
        autoFocus
        onFocus={(event) => {
          event.target.select()
        }}
      />
      <TextField
        value={count}
        id="outlined-basic"
        label="რაოდენობა"
        variant="outlined"
        size="small"
        type="number"
        onChange={(e) => setCount(e.target.value)}
        onFocus={(event) => {
          event.target.select()
        }}
      />

      <div className="flex gap-2 self-end pt-4">
        <Button
          size="small"
          variant="contained"
          color="error"
          onClick={() => {
            modal.closeModal()
          }}
        >
          გაუქმება
        </Button>

        <Button
          type="submit"
          size="small"
          variant="contained"
          disabled={name !== '' ? false : true}
        >
          შენახვა
        </Button>
      </div>
    </form>
  )
}

export default AddProductForm

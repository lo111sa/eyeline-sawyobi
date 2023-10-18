import { Button, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import Select from 'react-tailwindcss-select'
import { useProductsStore } from '../store/productsStore'
import { useModalStore } from '../store/modalStore'
const ipcRenderer = window.ipcRenderer

const IssueProduct = ({ id, name, searchText }) => {
  const products = useProductsStore()
  const modal = useModalStore()
  const [value, setValue] = useState('')
  const [staff, setStaff] = useState([])
  const [count, setCount] = useState(0)

  useEffect(() => {
    setStaff([])
    ipcRenderer.send('staff', id)
    ipcRenderer.on('staff', (res) => {
      res.forEach((item) => {
        setStaff((prev) => [...prev, { value: item.id, label: item.name }])
      })
    })

    return () => {
      ipcRenderer.off()
    }
  }, [])

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        ipcRenderer.send('issue', { id, count, name, staffName: value.label, staffId: value.value })
        products.fetchProducts(searchText)
        modal.closeModal()
      }}
      className="flex flex-col gap-5 text-indigo-800"
    >
      <p className="text-center text-2xl">{name}</p>
      <div className="w-[500px] h-80 flex gap-4 text-black">
        <TextField
          value={count}
          onChange={(e) => setCount(e.target.value)}
          autoFocus
          type="number"
          size="small"
          label="რაოდენობა"
        />

        <Select
          value={value}
          onChange={(e) => {
            setValue(e)
          }}
          options={staff}
          isSearchable
          isClearable
          placeholder="აირჩიე თანამშრომელი"
          searchInputPlaceholder="ძიება..."
        />
      </div>
      <Button type="submit" variant="contained">
        გაცემა
      </Button>
    </form>
  )
}

export default IssueProduct

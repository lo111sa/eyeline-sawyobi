import { Button, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import Select from 'react-tailwindcss-select'
import { useProductsStore } from '../store/productsStore'
import { useModalStore } from '../store/modalStore'
const ipcRenderer = window.ipcRenderer

const IssueProduct = ({ id, name, searchText, stock }) => {
  const products = useProductsStore()
  const modal = useModalStore()
  const [value, setValue] = useState('')
  const [staff, setStaff] = useState([])
  const [count, setCount] = useState(1)
  const [close, setClose] = useState(false)

  useEffect(() => {
    setStaff([])
    ipcRenderer.send('get-staff', id)
    ipcRenderer.on('get-staff', (res) => {
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
      onSubmit={async (e) => {
        e.preventDefault()
        await ipcRenderer.send('issue', {
          id,
          count,
          name,
          staffName: value.label,
          staffId: value.value
        })
        await ipcRenderer.on('issue', async (res) => {
          res?.message === 'ok' && products.fetchProducts(searchText)
        })

        setValue('')
        setCount(1)
      }}
      className="flex flex-col gap-5 text-indigo-800"
    >
      <p className="text-center text-2xl">{name}</p>
      <div className="w-[500px] h-80 flex gap-4 text-black">
        <TextField
          value={count}
          onChange={(e) => setCount(e.target.value <= stock ? e.target.value : stock)}
          autoFocus
          type="number"
          size="small"
          label="რაოდენობა"
          onFocus={(event) => {
            event.target.select()
          }}
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
      <Button type="submit" variant="contained" disabled={value !== '' ? false : true}>
        გაცემა
      </Button>
    </form>
  )
}

export default IssueProduct

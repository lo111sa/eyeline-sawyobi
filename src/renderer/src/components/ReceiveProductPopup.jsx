import { Button, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useProductsStore } from '../store/productsStore'
const ipcRenderer = window.ipcRenderer

const ReceiveProductPopup = ({ setPopup, item, searchText }) => {
  const products = useProductsStore()
  const [count, setCount] = useState(1)

  return (
    <div className=" absolute h-5 top-8 -left-20 z-50">
      <form
        onSubmit={() => {
          ipcRenderer.send('receive', {
            name: item.name,
            count: count,
            id: item.id
          })
          setPopup()
          ipcRenderer.on('receive', async (res) => {
            res?.message === 'ok' && products.fetchProducts(searchText)
          })
        }}
        className="flex flex-col gap-3 bg-slate-200 p-4 rounded-md"
      >
        <p className="text-center">პროდუქტის მიღება</p>
        <TextField
          className="bg-white"
          value={count}
          autoFocus
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
        <div className="flex gap-2 items-center self-end">
          <Button
            size="small"
            className="w-2 self-center"
            color="error"
            variant="contained"
            onClick={setPopup}
          >
            X
          </Button>

          <Button
            disabled={count === 0 ? true : false}
            size="small"
            className="w-2 self-center"
            variant="contained"
            type="submit"
          >
            Ok
          </Button>
        </div>
      </form>
    </div>
  )
}

export default ReceiveProductPopup

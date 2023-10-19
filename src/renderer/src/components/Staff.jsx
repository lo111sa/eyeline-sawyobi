import { Button, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
const ipcRenderer = window.ipcRenderer

const Staff = () => {
  const [staff, setStaff] = useState([])
  const [name, setName] = useState('')

  const addStaff = async () => {
    await ipcRenderer.send('add-staff', name)
  }

  const getStaff = async () => {
    await ipcRenderer.send('get-staff')
    ipcRenderer.on('get-staff', async (res) => {
      setStaff(res)
    })
  }

  useEffect(() => {
    getStaff()
    return () => ipcRenderer.off()
  }, [addStaff])

  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault()
          addStaff()
          setName('')
        }}
        className="flex items-center gap-2 mt-5"
      >
        <TextField
          value={name}
          onChange={(e) => setName(e.target.value)}
          autoFocus
          size="small"
          label="სახელი გვარი"
          onFocus={(event) => {
            event.target.select()
          }}
        />
        <Button type="submit" variant="contained">
          დამატება
        </Button>
      </form>
      <div className="mt-3 max-h-[calc(100vh-220px)]">
        {' '}
        <table className="w-full  text-sm text-left text-gray-500  overflow-auto">
          <thead className=" text-blue-700  bg-gray-100 sticky top-0">
            <tr>
              <th scope="col" className="px-6 py-2">
                #
              </th>
              <th scope="col" className="px-6 py-2">
                სახელი გვარი
              </th>
              <th scope="col" className="px-6 py-2"></th>
            </tr>
          </thead>
          <tbody>
            {staff?.length
              ? staff.map((item, index) => {
                  return (
                    <tr
                      key={item.id}
                      className="bg-white border-b even:bg-gray-50 hover:bg-gray-200 dark:hover:bg-gray-600 text-[16px]"
                    >
                      <td
                        scope="row"
                        className="px-6 py-2 font-medium text-gray-900 whitespace-nowrap"
                      >
                        {index + 1}
                      </td>
                      <td
                        scope="row"
                        className="px-6 py-2 font-medium text-gray-900 whitespace-nowrap"
                      >
                        {item.name}
                      </td>

                      <td
                        scope="row"
                        className="px-6 py-2 font-medium text-gray-900 whitespace-nowrap"
                      >
                        <Button
                          size="small"
                          variant="outlined"
                          color="error"
                          onClick={async () => {
                            await ipcRenderer.send('delete-staff', { id: item.id })
                            await getStaff()
                          }}
                        >
                          წაშლა
                        </Button>
                      </td>
                    </tr>
                  )
                })
              : null}
          </tbody>
        </table>
      </div>
    </>
  )
}

export default Staff

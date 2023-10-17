import React, { useState } from 'react'
import { useModalStore } from '../store/modalStore'
import Modal from './Modal'
import SingleProductRecives from './SingleProductRecives'
import { Button, TextField } from '@mui/material'
import ReceiveProductPopup from './ReceiveProductPopup'
const ipcRenderer = window.ipcRenderer

const MainTable = ({ data }) => {
  const modal = useModalStore()
  const [currItem, setCurrItem] = useState({})
  const [popup, setPopup] = useState(false)
  return (
    <div className="w-full h-full overflow-y-auto">
      <table className="w-full  text-sm text-left text-gray-500 overflow-scroll">
        <thead className=" text-blue-700  bg-gray-100 dark:bg-gray-700 dark:text-gray-400 sticky top-0">
          <tr>
            <th scope="col" className="px-6 py-2">
              #
            </th>
            <th scope="col" className="px-6 py-2">
              დასახელება
            </th>
            <th scope="col" className="px-6 py-2">
              ნაშთი
            </th>
            <th scope="col" className="px-6 py-2"></th>
          </tr>
        </thead>
        <tbody>
          {data?.length
            ? data.map((item, index) => {
                return (
                  <tr
                    key={item.id}
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 text-[16px]"
                  >
                    <td
                      scope="row"
                      className="px-6 py-2 font-medium text-gray-900 whitespace-nowrap border"
                    >
                      {index + 1}
                    </td>
                    <td
                      scope="row"
                      className="px-6 py-2 font-medium text-gray-900 whitespace-nowrap border"
                    >
                      {item.name}
                    </td>
                    <td
                      scope="row"
                      className="px-6 py-2 font-medium text-gray-900 whitespace-nowrap border"
                    >
                      {item.count}
                    </td>

                    <td className="px-6 py-2  font-medium text-gray-900 whitespace-nowrap flex justify-end">
                      <div className="flex gap-4 items-center relative self-end">
                        <Button
                          color="success"
                          size="small"
                          variant="outlined"
                          onClick={() => {
                            setCurrItem(item)
                            modal.setModalType('product-info')
                            modal.openModal()
                          }}
                        >
                          ისტორია
                        </Button>

                        <Button
                          size="small"
                          variant="outlined"
                          onClick={() => {
                            setCurrItem(item)
                            setPopup(true)
                          }}
                        >
                          მიღება
                        </Button>

                        <Button size="small" variant="outlined" color="error" onClick={() => {}}>
                          წაშლა
                        </Button>

                        {item.id === currItem.id && popup === true ? (
                          <ReceiveProductPopup item={item} setPopup={() => setPopup(false)} />
                        ) : null}
                      </div>
                    </td>
                  </tr>
                )
              })
            : null}
        </tbody>
      </table>
      {modal.modalType === 'product-info' && (
        <Modal title={'მიღებების ისტორია'}>
          <SingleProductRecives {...currItem} />
        </Modal>
      )}
    </div>
  )
}

export default MainTable

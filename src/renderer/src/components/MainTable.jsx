import React, { useState } from 'react'
import { useModalStore } from '../store/modalStore'
import Modal from './Modal'
import SingleProductRecives from './SingleProductRecives'
import { Button, TextField } from '@mui/material'
import ReceiveProductPopup from './ReceiveProductPopup'
import IssueProduct from './IssueProduct'
import Staff from './Staff'
import { useProductsStore } from '../store/productsStore'
const ipcRenderer = window.ipcRenderer

const MainTable = ({ data, searchText }) => {
  const modal = useModalStore()
  const products = useProductsStore()
  const [currItem, setCurrItem] = useState({})
  const [popup, setPopup] = useState(false)

  const deleteProduct = async (id) => {
    await ipcRenderer.send('delete-product', { id: id })
    await products.fetchProducts(searchText)
  }
  return (
    <div className="w-full h-full overflow-y-auto">
      <table className="w-full  text-sm text-left text-gray-500 overflow-scroll table-fixed">
        <thead className=" text-blue-700  bg-gray-100 sticky top-0">
          <tr>
            <th scope="col" className="px-6 py-2 w-20">
              #
            </th>
            <th scope="col" className="px-6 py-2">
              დასახელება
            </th>
            <th scope="col" className="px-6 py-2">
              ნაშთი
            </th>
            <th scope="col" className="px-6 py-2 "></th>
          </tr>
        </thead>
        <tbody>
          {data?.length
            ? data.map((item, index) => {
                return (
                  <tr
                    key={item.id}
                    className={`border-b  hover:bg-gray-200 ${
                      item.count > 0 ? 'bg-white even:bg-gray-50' : 'bg-red-500'
                    } text-[16px]`}
                  >
                    <td
                      scope="row"
                      className="px-6 py-2 font-medium text-gray-900 whitespace-nowrap  "
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
                      className="px-6 py-2 font-medium text-gray-900 whitespace-nowrap "
                    >
                      {item.count}
                    </td>

                    <td className="px-6 py-2  font-medium text-gray-900 whitespace-nowrap flex justify-end">
                      <div className="flex gap-4 items-center relative self-end">
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

                        <Button
                          size="small"
                          variant="outlined"
                          onClick={() => {
                            setCurrItem(item)
                            modal.setModalType('issue')
                            modal.openModal()
                          }}
                        >
                          გაცემა
                        </Button>

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
                          color="error"
                          onClick={() => {
                            deleteProduct(item.id)
                          }}
                        >
                          წაშლა
                        </Button>

                        {item.id === currItem.id && popup === true ? (
                          <ReceiveProductPopup
                            item={item}
                            searchText={searchText}
                            setPopup={() => setPopup(false)}
                          />
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
        <Modal title={'მიღება / გაცემების ისტორია'}>
          <SingleProductRecives {...currItem} />
        </Modal>
      )}

      {modal.modalType === 'issue' && (
        <Modal title={'პროდუქტის გაცემა'}>
          <IssueProduct {...currItem} searchText={searchText} stock={currItem.count} />
        </Modal>
      )}

      {modal.modalType === 'add-staff' && (
        <Modal title={'თანამშრომლის დამატება'}>
          <Staff />
        </Modal>
      )}
    </div>
  )
}

export default MainTable

import React, { useEffect, useState } from 'react'
const ipcRenderer = window.ipcRenderer

const SingleProductRecives = ({ name, id }) => {
  const [data, setData] = useState([])
  const [issued, setIssued] = useState([])

  useEffect(() => {
    ipcRenderer.send('received-by-id', id)
    ipcRenderer.on('received-by-id', (res) => {
      setData(res)
    })

    ipcRenderer.send('get-issued', id)
    ipcRenderer.on('get-issued', (res) => {
      setIssued(res)
    })
    return () => {
      ipcRenderer.off()
    }
  }, [])

  return (
    <div className="w-full ">
      <p className="mb-4 text-2xl text-center text-indigo-600 font-bold">{name}</p>
      <div className="flex gap-5 overflow-hidden">
        <div className="border ">
          <p className="text-center pb-1 mb-2 text-lg text-indigo-800 border-b">მიღება</p>
          <table className="w-full  text-sm text-left text-gray-500 ">
            <thead className=" text-blue-700  bg-gray-100 ">
              <tr>
                <th scope="col" className="px-6 py-2">
                  რაოდენობა
                </th>
                <th scope="col" className="px-6 py-2">
                  თარიღი
                </th>
                <th scope="col" className="px-6 py-2">
                  დრო
                </th>
              </tr>
            </thead>
            <tbody>
              {data?.length
                ? data.map((item, index) => {
                    return (
                      <tr
                        key={item.id}
                        className="bg-white border-b hover:bg-gray-50 dark:hover:bg-gray-600 text-[16px]"
                      >
                        <td
                          scope="row"
                          className="px-6 py-2 font-medium text-gray-900 whitespace-nowrap"
                        >
                          {item.count}
                        </td>
                        <td
                          scope="row"
                          className="px-6 py-2 font-medium text-gray-900 whitespace-nowrap"
                        >
                          {item.date}
                        </td>
                        <td
                          scope="row"
                          className="px-6 py-2 font-medium text-gray-900 whitespace-nowrap"
                        >
                          {item.time}
                        </td>
                      </tr>
                    )
                  })
                : null}
            </tbody>
          </table>
        </div>

        <div className="border">
          <p className="text-center pb-1 mb-2 text-lg text-indigo-800 border-b">გაცემა</p>
          <table className="w-full  text-sm text-left text-gray-500 ">
            <thead className=" text-blue-700  bg-gray-100 ">
              <tr>
                <th scope="col" className="px-6 py-2">
                  რაოდენობა
                </th>
                <th scope="col" className="px-6 py-2">
                  თანამშრომელი
                </th>
                <th scope="col" className="px-6 py-2">
                  თარიღი
                </th>
                <th scope="col" className="px-6 py-2">
                  დრო
                </th>
              </tr>
            </thead>
            <tbody>
              {issued?.length
                ? issued.map((item, index) => {
                    return (
                      <tr
                        key={item.id}
                        className="bg-white border-b hover:bg-gray-50 dark:hover:bg-gray-600 text-[16px]"
                      >
                        <td
                          scope="row"
                          className="px-6 py-2 font-medium text-gray-900 whitespace-nowrap"
                        >
                          {item.count}
                        </td>
                        <td
                          scope="row"
                          className="px-6 py-2 font-medium text-gray-900 whitespace-nowrap"
                        >
                          {item.staffName}
                        </td>
                        <td
                          scope="row"
                          className="px-6 py-2 font-medium text-gray-900 whitespace-nowrap"
                        >
                          {item.date}
                        </td>
                        <td
                          scope="row"
                          className="px-6 py-2 font-medium text-gray-900 whitespace-nowrap"
                        >
                          {item.time}
                        </td>
                      </tr>
                    )
                  })
                : null}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
export default SingleProductRecives

import React, { useEffect, useState } from 'react'
const ipcRenderer = window.ipcRenderer

const SingleProductRecives = ({ name, id }) => {
  const [data, setData] = useState([])

  useEffect(() => {
    ipcRenderer.send('received-by-id', id)
    ipcRenderer.on('received-by-id', (res) => {
      setData(res)
      console.log(res)
    })

    return () => {
      ipcRenderer.off()
    }
  }, [])

  return (
    <div className="w-full h-full overflow-y-auto">
      <p className="mb-2 text-xl text-center">{name}</p>
      <table className="w-full  text-sm text-left text-gray-500 dark:text-gray-400 overflow-scroll">
        <thead className=" text-blue-700  bg-gray-300 dark:bg-gray-700 dark:text-gray-400">
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
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 text-[16px]"
                  >
                    <td
                      scope="row"
                      className="px-6 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {item.count}
                    </td>
                    <td
                      scope="row"
                      className="px-6 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {item.date}
                    </td>
                    <td
                      scope="row"
                      className="px-6 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white"
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
  )
}
export default SingleProductRecives

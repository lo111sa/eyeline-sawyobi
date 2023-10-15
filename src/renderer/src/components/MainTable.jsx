import React from 'react'

const MainTable = ({ data }) => {
  return (
    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
      <thead className=" text-blue-700  bg-gray-300 dark:bg-gray-700 dark:text-gray-400">
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
                    {index + 1}
                  </td>
                  <td
                    scope="row"
                    className="px-6 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {item.name}
                  </td>
                  <td
                    scope="row"
                    className="px-6 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {item.count}
                  </td>
                </tr>
              )
            })
          : null}
      </tbody>
    </table>
  )
}

export default MainTable

import React, { useEffect, useState } from 'react'
const ipcRenderer = window.ipcRenderer

const SingleProductRecives = ({ id }) => {
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

  return <div>SingleProductRecives</div>
}

export default SingleProductRecives

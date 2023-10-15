import { Button, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useModalStore } from '../store/ModalStore';

const AddProductForm = () => {
    const modal = useModalStore()
    const [name,setName] = useState('');
    const [count,setCount] = useState(0);
    const ipcRenderer = window.ipcRenderer;

    const onSubmit = (e)=>{
        e.preventDefault();
        const data = {
            name,
            count
        }
        ipcRenderer.send('add-new-product', data);
        ipcRenderer.on('add-new-product', (res) => {
            console.log(res)
          })
    }

    useEffect(() => {
       
        
      }, []);

  return (
    <form onSubmit={onSubmit} 
          className='flex flex-col gap-4 py-2'>
         <TextField id="outlined-basic" label="დასახელება" variant="outlined" size="small" onChange={(e)=>setName(e.target.value)}/>
          <TextField id="outlined-basic" label="რაოდენობა" variant="outlined" size="small" type='number' onChange={(e)=>setCount(e.target.value)}/>
         
         
          <div className='flex gap-2 self-end pt-4'>
          <Button
            size="small"
            variant="contained"
            color="error"
            onClick={() => {
              modal.closeModal()
            }}
          >
            გაუქმება
          </Button>

          <Button
            type='submit'
            size="small"
            variant="contained"
            
          >
            შენახვა
          </Button>

          
          </div>
    </form>
  )
}

export default AddProductForm
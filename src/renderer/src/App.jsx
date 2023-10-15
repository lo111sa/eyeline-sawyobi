import { Button } from '@mui/material'
import Main from './pages/Main'
import { useModalStore } from './store/modalStore'
import AddProductForm from './components/AddProductForm'
import Modal from './components/Modal'

function App() {
  const modal = useModalStore()
  return (
    <div className="flex gap-3 p-2 h-[100vh]">
      {/* LeftBar */}
      <div className="w-[350px] border rounded-md shadow pt-2 ">
        <Button
          className="w-full"
          size="small"
          variant="outlined"
          onClick={() => {
            modal.openModal()
            modal.setModalType('add-product')
          }}
        >
          ახალი პროდუქტის დამატება
        </Button>
      </div>
      {/* RightBar */}

      <Main />
    </div>
  )
}

export default App

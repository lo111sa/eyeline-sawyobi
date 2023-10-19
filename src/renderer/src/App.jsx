import { Button } from '@mui/material'
import Main from './pages/Main'
import { useModalStore } from './store/modalStore'

function App() {
  const modal = useModalStore()
  return (
    <div className="flex gap-3 p-2 h-[100vh]">
      {/* LeftBar */}
      <div className="w-[350px] border rounded-md shadow pt-2 ">
        <div className="flex flex-col gap-3 px-3">
          <div>
            <p className="border-b text-center pb-2">მენიუ</p>
          </div>
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

          <Button
            className="w-full"
            size="small"
            variant="outlined"
            onClick={() => {
              modal.openModal()
              modal.setModalType('add-staff')
            }}
          >
            თანამშრომლის დამატება
          </Button>
        </div>
      </div>
      {/* RightBar */}

      <Main />
    </div>
  )
}

export default App

import { Button } from '@mui/material'
import Main from './pages/Main'
import { useModalStore } from './store/ModalStore'

function App() {
  const modal = useModalStore()
  return (
    <div className="flex gap-3 p-2 h-[100vh]">
      {/* LeftBar */}
      <div className="w-[350px] border rounded-md shadow ">
        <Button size="small" variant="contained" onClick={modal.openModal}>
          მიღება
        </Button>
      </div>
      {/* RightBar */}
      <div className="w-full border rounded-md shadow">
        {' '}
        <Main />
      </div>
    </div>
  )
}

export default App

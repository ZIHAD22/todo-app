import { Route, Routes } from 'react-router-dom'
import Home from '../Pages/Home/Home'
import Header from '../Pages/Shared/Header'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import './App.css'

function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
      <ToastContainer />
    </div>
  )
}

export default App

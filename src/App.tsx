import { Route, Routes } from 'react-router-dom'
import './assets/App.css'

import { Home } from "../pages/Home"
import { Store } from "../pages/Store"

import { Navbar } from "../components/Navbar"

function App() {
  const handlSearch = () => {

  }

  return (
    <div className='min-h-screen bg-slate-200 text-black'>
      <Navbar handleSearch={handlSearch} />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/Store' element={<Store />} />
      </Routes>
    </div>
  )
}

export default App

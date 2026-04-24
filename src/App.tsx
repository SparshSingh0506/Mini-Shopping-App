import { Route, Routes } from 'react-router-dom'

import { Home } from "../pages/Home"
import { Cart } from "../pages/Cart"

import { Navbar } from "../components/layout/Navbar"

function App() {

  const handlSearch = (): void => {
    return;
  }

  return (
    <div className='min-h-screen bg-gray-200 text-black'>
      <Navbar handleSearch={handlSearch} />

      <div className='flex-1 p-4'>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/cart' element={<Cart />} />
        </Routes>
      </div>
    </div>
  )
}

export default App

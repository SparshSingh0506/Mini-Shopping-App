import { Navigate, Route, Routes, useNavigate } from 'react-router-dom'

import { Home } from "../pages/Home"
import { Cart } from "../pages/Cart"
import { Products } from "../pages/Products"

import { Navbar } from "../components/layout/Navbar"

function App() {
  const navigateTo = useNavigate();

  const handleSearch = (query: string): void => {
    if (!query.trim()) {
      navigateTo('/');
      return;
    }
    
    const queryParam = `/?search=${encodeURIComponent(query)}`;

    navigateTo(queryParam);
  }

  return (
    <div className='min-h-screen bg-gray-200 text-black'>
      <Navbar handleSearch={handleSearch} />

      <div className='flex-1 p-4'>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/products/' element={<Navigate to="/" />}/> 
          <Route path='/products/:id' element={<Products />}/>
        </Routes>
      </div>
    </div>
  )
}

export default App

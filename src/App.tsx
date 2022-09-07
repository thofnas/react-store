import { Navigate, Outlet, Route, Routes, useLocation } from 'react-router-dom'

import Sidebar from './components/Sidebar/Sidebar'
import Product from './Product'
import ProductsList from './ProductsList'

export default function App() {
  // const location = useLocation<{
  //   background?: Location<{} | null | undefined>
  // }>()

  // let background = location.state && location.state?.background

  return (
    <Routes>
      <Route path='/products' element={<Layout />}>
        <Route path='' element={<ProductsList />} />
        <Route path=':productId' element={<Product />} />
        <Route path='*' element={<Navigate to={'/products'} />} />
      </Route>
      <Route path='*' element={<Navigate to={'/products'} />} />
    </Routes>
  )
}

const Layout = () => {
  return (
    <div className='App'>
      <Sidebar />
      <Outlet />
    </div>
  )
}

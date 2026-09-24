import { Route, Routes } from 'react-router-dom'
import Layout from './components/layout/Layout'
import Home from './components/Pages/Home'
import ProductsListContainer from './components/Pages/ProductsListContainer'
import Contactos from './components/Pages/Contactos'
import Cart from './components/Pages/Cart'
import ProductDetailContainer from './components/Pages/ProductDetailContainer'

function App() {

  return (
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<Home />} />  
          <Route path='/productos' element={<ProductsListContainer />} />  
          <Route path='/productos/:id' element={<ProductDetailContainer />} />  
          <Route path='/ofertas' element={<ProductsListContainer soloOfertas={true} />} />
          <Route path='/contactos' element={<Contactos />} />  
          <Route path='/carrito' element={<Cart />} />
        </Route>
      </Routes>
  )
}

export default App

import { Routes, Route } from 'react-router-dom'
import { CartProvider } from './context/cartContext'
import { AuthProvider } from './context/authContext'
import Navbar from './components/Navbar'
import HomePage from './pages/HomePage'
import LoginPage from './pages/loginPage'
import RegisterPage from './pages/registerPage'
import ProductPage from './pages/productPage'
import CartPage from './pages/cartPage'
import CheckoutPage from './pages/checkoutPage'

export default function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <div className="min-h-screen bg-gray-50">
          <Navbar />
          <main className="max-w-6xl mx-auto px-4 py-8">
            <Routes>
              <Route path="/"            element={<HomePage />} />
              <Route path="/login"       element={<LoginPage />} />
              <Route path="/register"    element={<RegisterPage />} />
              <Route path="/product/:id" element={<ProductPage />} />
              <Route path="/cart"        element={<CartPage />} />
              <Route path="/checkout"    element={<CheckoutPage />} />
            </Routes>
          </main>
        </div>
      </CartProvider>
    </AuthProvider>
  )
}
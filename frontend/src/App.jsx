// import { Routes, Route } from 'react-router-dom'
// import { CartProvider } from './context/CartContext'
// import { AuthProvider } from './context/AuthContext'
// import Navbar from './components/Navbar'
// import HomePage from './pages/HomePage'
// import ProductPage from './pages/ProductPage'
// import CartPage from './pages/CartPage'
// import LoginPage from './pages/LoginPage'
// import RegisterPage from './pages/RegisterPage'
// import CheckoutPage from './pages/CheckoutPage'

// export default function App() {
//   return (
//     <AuthProvider>
//       <CartProvider>
//         <div className="min-h-screen bg-gray-50">
//           <Navbar />
//           <main className="max-w-6xl mx-auto px-4 py-8">
//             <Routes>
//               <Route path="/"            element={<HomePage />} />
//               <Route path="/product/:id" element={<ProductPage />} />
//               <Route path="/cart"        element={<CartPage />} />
//               <Route path="/login"       element={<LoginPage />} />
//               <Route path="/register"    element={<RegisterPage />} />
//               <Route path="/checkout"    element={<CheckoutPage />} />
//             </Routes>
//           </main>
//         </div>
//       </CartProvider>
//     </AuthProvider>
//   )
// }
import { Routes, Route } from 'react-router-dom'
import { CartProvider } from './context/cartContext'
import { AuthProvider } from './context/authContext'
import Navbar from './components/Navbar'
import HomePage from './pages/HomePage'
import LoginPage from './pages/loginPage'
import RegisterPage from './pages/registerPage'
import ProductPage from './pages/productPage'

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
            </Routes>
          </main>
        </div>
      </CartProvider>
    </AuthProvider>
  )
}
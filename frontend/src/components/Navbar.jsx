import { Link } from 'react-router-dom'
import { useCart } from '../context/cartContext'
import { useAuth } from '../context/authContext'

export default function Navbar() {
  const { totalItems } = useCart()
  const { user, logout } = useAuth()

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-10">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="text-xl font-bold text-gray-900">ShopApp</Link>
        <div className="flex items-center gap-6">
          <Link to="/" className="text-gray-600 hover:text-gray-900">Products</Link>
          {user ? (
            <>
              <span className="text-gray-600">Hi, {user.name}</span>
              <button onClick={logout} className="text-gray-600 hover:text-gray-900">Logout</button>
            </>
          ) : (
            <Link to="/login" className="text-gray-600 hover:text-gray-900">Login</Link>
          )}
          <Link to="/cart" className="relative">
            <span className="text-2xl">🛒</span>
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </Link>
        </div>
      </div>
    </nav>
  )
}
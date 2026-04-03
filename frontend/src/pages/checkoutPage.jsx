import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import api from '../utils/api'
import { useCart } from '../context/cartContext'
import { useAuth } from '../context/authContext'

export default function CheckoutPage() {
  const { cartItems, totalPrice, clearCart } = useCart()
  const { user }   = useAuth()
  const navigate   = useNavigate()

  const [address, setAddress] = useState('')
  const [city, setCity]       = useState('')
  const [country, setCountry] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError]     = useState(null)

  // Redirect if not logged in or cart is empty
  if (!user) {
    navigate('/login')
    return null
  }

  if (cartItems.length === 0) {
    return (
      <div className="text-center py-16">
        <p className="text-gray-500 text-lg mb-4">No items to checkout</p>
        <Link to="/" className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700">
          Go Shopping
        </Link>
      </div>
    )
  }

  const handleOrder = async (e) => {
    e.preventDefault()
    try {
      setLoading(true)
      setError(null)
      const { data } = await api.post('/orders', {
        items: cartItems,
        shippingAddress: { address, city, country },
        totalPrice,
      })
      clearCart()
      navigate(`/order-success/${data._id}`)
    } catch (err) {
      setError(err.response?.data?.message || 'Order failed, please try again')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Checkout</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

        {/* Left — shipping form */}
        <div>
          <form onSubmit={handleOrder}
            className="bg-white rounded-xl border border-gray-100 p-6 space-y-4">
            <h2 className="font-semibold text-gray-900 text-lg">Shipping Address</h2>

            {error && (
              <div className="bg-red-50 text-red-600 px-4 py-3 rounded-lg text-sm">{error}</div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Street Address</label>
              <input
                type="text"
                value={address}
                onChange={e => setAddress(e.target.value)}
                placeholder="123 Main Street"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
              <input
                type="text"
                value={city}
                onChange={e => setCity(e.target.value)}
                placeholder="London"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Country</label>
              <input
                type="text"
                value={country}
                onChange={e => setCountry(e.target.value)}
                placeholder="United Kingdom"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold disabled:opacity-50 mt-2">
              {loading ? 'Placing order...' : `Place Order · £${totalPrice.toFixed(2)}`}
            </button>
          </form>
        </div>

        {/* Right — order summary */}
        <div>
          <div className="bg-white rounded-xl border border-gray-100 p-6">
            <h2 className="font-semibold text-gray-900 text-lg mb-4">Order Summary</h2>

            <div className="space-y-3 mb-4">
              {cartItems.map(item => (
                <div key={item._id} className="flex items-center gap-3">
                  <img
                    src={item.image || 'https://via.placeholder.com/48'}
                    alt={item.name}
                    className="w-12 h-12 object-cover rounded-lg flex-shrink-0"
                  />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">{item.name}</p>
                    <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                  </div>
                  <p className="text-sm font-semibold text-gray-900">
                    £{(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              ))}
            </div>

            <div className="border-t border-gray-100 pt-4 space-y-2">
              <div className="flex justify-between text-sm text-gray-600">
                <span>Subtotal</span>
                <span>£{totalPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm text-gray-600">
                <span>Shipping</span>
                <span className="text-green-600">Free</span>
              </div>
              <div className="flex justify-between font-bold text-gray-900 pt-2 border-t border-gray-100">
                <span>Total</span>
                <span>£{totalPrice.toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* Logged in as */}
          <div className="bg-blue-50 rounded-xl p-4 mt-4">
            <p className="text-sm text-blue-700">
              Ordering as <span className="font-semibold">{user.name}</span> ({user.email})
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
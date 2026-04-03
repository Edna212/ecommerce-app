import { Link, useNavigate } from 'react-router-dom'
import { useCart } from '../context/cartContext'
import { useAuth } from '../context/authContext'

export default function CartPage() {
  const { cartItems, removeFromCart, addToCart,decreaseQuantity, totalPrice } = useCart()
  const { user }   = useAuth()
  const navigate   = useNavigate()

  const handleCheckout = () => {
    if (!user) return navigate('/login')
    navigate('/checkout')
  }

  // Empty cart state
  if (cartItems.length === 0) {
    return (
      <div className="text-center py-16">
        <p className="text-6xl mb-4">🛒</p>
        <p className="text-gray-500 text-lg mb-6">Your cart is empty</p>
        <Link to="/"
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors">
          Continue Shopping
        </Link>
      </div>
    )
  }

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">
        Shopping Cart ({cartItems.length} {cartItems.length === 1 ? 'item' : 'items'})
      </h1>

      {/* Cart items */}
      <div className="space-y-4 mb-8">
        {cartItems.map(item => (
          <div key={item._id}
            className="bg-white rounded-xl border border-gray-100 p-4 flex items-center gap-4">
            
            {/* Image */}
            <img
              src={item.image || 'https://via.placeholder.com/80'}
              alt={item.name}
              className="w-20 h-20 object-cover rounded-lg flex-shrink-0"
            />

            {/* Name & category */}
            <div className="flex-1">
              <Link to={`/product/${item._id}`}
                className="font-semibold text-gray-900 hover:text-blue-600">
                {item.name}
              </Link>
              <p className="text-gray-500 text-sm mt-1">£{item.price.toFixed(2)} each</p>

              {/* Quantity controls */}
              <div className="flex items-center gap-3 mt-2">
                <button
                  onClick={() => decreaseQuantity(item._id)}
                  className="w-7 h-7 rounded-full border border-gray-300 flex items-center justify-center text-gray-600 hover:bg-gray-100">
                  −
                </button>
                <span className="text-sm font-medium w-4 text-center">{item.quantity}</span>
                <button
                  onClick={() => addToCart(item)}
                  className="w-7 h-7 rounded-full border border-gray-300 flex items-center justify-center text-gray-600 hover:bg-gray-100">
                  +
                </button>
              </div>
            </div>

            {/* Price & remove */}
            <div className="text-right flex-shrink-0">
              <p className="font-bold text-gray-900">
                £{(item.price * item.quantity).toFixed(2)}
              </p>
              <button
                onClick={() => removeFromCart(item._id)}
                className="text-red-400 text-xs hover:text-red-600 mt-2 hover:underline">
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Order summary */}
      <div className="bg-white rounded-xl border border-gray-100 p-6">
        <h2 className="font-semibold text-gray-900 mb-4">Order Summary</h2>

        <div className="space-y-2 mb-4">
          <div className="flex justify-between text-sm text-gray-600">
            <span>Subtotal</span>
            <span>£{totalPrice.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-sm text-gray-600">
            <span>Shipping</span>
            <span className="text-green-600">Free</span>
          </div>
        </div>

        <div className="border-t border-gray-100 pt-4 mb-6">
          <div className="flex justify-between text-lg font-bold text-gray-900">
            <span>Total</span>
            <span>£{totalPrice.toFixed(2)}</span>
          </div>
        </div>

        <button
          onClick={handleCheckout}
          className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold">
          {user ? 'Proceed to Checkout' : 'Login to Checkout'}
        </button>

        <Link to="/"
          className="block text-center text-sm text-gray-500 hover:text-gray-700 mt-4">
          ← Continue Shopping
        </Link>
      </div>
    </div>
  )
}
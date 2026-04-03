import { Link } from 'react-router-dom'
import { useCart } from '../context/cartContext'

export default function ProductCard({ product }) {
  const { addToCart } = useCart()

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
      <Link to={`/product/${product._id}`}>
        <img
          src={product.image || 'https://via.placeholder.com/300x200'}
          alt={product.name}
          className="w-full h-48 object-cover"
        />
      </Link>
      <div className="p-4">
        <Link to={`/product/${product._id}`}>
          <h3 className="font-semibold text-gray-900 hover:text-blue-600 transition-colors">
            {product.name}
          </h3>
        </Link>
        <p className="text-sm text-gray-500 mt-1">{product.category}</p>
        <div className="flex items-center justify-between mt-4">
          <span className="text-lg font-bold text-gray-900">£{product.price.toFixed(2)}</span>
          <button
            onClick={() => addToCart(product)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700 transition-colors"
          >
            Add to cart
          </button>
        </div>
      </div>
    </div>
  )
}
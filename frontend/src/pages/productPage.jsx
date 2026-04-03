import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import api from '../utils/api'
import { useCart } from '../context/cartContext'

export default function ProductPage() {
  const { id } = useParams()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [added, setAdded]     = useState(false)
  const { addToCart }         = useCart()
  const navigate              = useNavigate()

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await api.get(`/products/${id}`)
        setProduct(data)
      } catch {
        console.error('Product not found')
      } finally {
        setLoading(false)
      }
    }
    fetchProduct()
  }, [id])

  const handleAddToCart = () => {
    addToCart(product)
    setAdded(true)
    // reset button after 2 seconds
    setTimeout(() => setAdded(false), 2000)
  }

  if (loading) return (
    <div className="flex justify-center items-center h-64">
      <p className="text-gray-500">Loading product...</p>
    </div>
  )

  if (!product) return (
    <div className="text-center py-16">
      <p className="text-red-500 mb-4">Product not found.</p>
      <button onClick={() => navigate('/')}
        className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700">
        Back to Home
      </button>
    </div>
  )

  return (
    <div className="max-w-4xl mx-auto">
      {/* Back button */}
      <button onClick={() => navigate(-1)}
        className="text-gray-500 hover:text-gray-900 mb-6 flex items-center gap-2">
        ← Back
      </button>

      <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Product image */}
          <img
            src={product.image || 'https://via.placeholder.com/400'}
            alt={product.name}
            className="w-full h-80 object-cover"
          />

          {/* Product details */}
          <div className="p-8 flex flex-col justify-between">
            <div>
              <p className="text-sm text-blue-600 font-medium mb-2">{product.category}</p>
              <h1 className="text-2xl font-bold text-gray-900 mb-4">{product.name}</h1>
              <p className="text-gray-600 mb-6">{product.description}</p>
            </div>

            <div>
              <p className="text-3xl font-bold text-gray-900 mb-2">
                £{product.price.toFixed(2)}
              </p>

              {/* Stock status */}
              <p className={`text-sm mb-6 ${product.stock > 0 ? 'text-green-600' : 'text-red-500'}`}>
                {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
              </p>

              <button
                onClick={handleAddToCart}
                disabled={product.stock === 0}
                className={`w-full py-3 rounded-lg font-semibold transition-colors
                  ${added
                    ? 'bg-green-500 text-white'
                    : 'bg-blue-600 text-white hover:bg-blue-700'
                  } disabled:opacity-50`}
              >
                {added ? '✓ Added to cart!' : 'Add to Cart'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
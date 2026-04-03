import { useState, useEffect } from 'react'
import api from '../utils/api'
import ProductCard from '../components/productCard'

export default function HomePage() {
  const [products, setProducts] = useState([])
  const [loading, setLoading]   = useState(true)
  const [error, setError]       = useState(null)
  const [search, setSearch]     = useState('')

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true)
        const { data } = await api.get(`/products?search=${search}`)
        setProducts(data)
      } catch (err) {
        setError('Failed to load products')
      } finally {
        setLoading(false)
      }
    }
    fetchProducts()
  }, [search])

  return (
    <div>
      <div className="mb-8">
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full max-w-md px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      {loading && <p className="text-gray-500">Loading products...</p>}
      {error   && <p className="text-red-500">{error}</p>}
      {!loading && products.length === 0 && (
        <p className="text-gray-500">No products found.</p>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map(product => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  )
}
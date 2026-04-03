import { Link, useParams } from 'react-router-dom'

export default function OrderSuccessPage() {
  const { id } = useParams()

  return (
    <div className="max-w-md mx-auto text-center py-16">
      <div className="bg-white rounded-xl border border-gray-100 p-10">
        <div className="text-6xl mb-4">✅</div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Order Placed!</h1>
        <p className="text-gray-500 mb-2">Thank you for your order.</p>
        <p className="text-xs text-gray-400 mb-8">Order ID: {id}</p>
        <Link to="/"
          className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold">
          Continue Shopping
        </Link>
      </div>
    </div>
  )
}
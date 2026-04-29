import { useEffect, useState } from "react"
import axios from "axios"
import { useAuth } from "../context/authContext"

export default function AdminOrdersPage() {
  const { user } = useAuth()
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }

        const { data } = await axios.get(
          "http://localhost:5000/api/v1/orders",
          config
        )

        setOrders(data)
      } catch (err) {
        setError(err.response?.data?.message || "Failed to load orders")
      } finally {
        setLoading(false)
      }
    }

    fetchOrders()
  }, [user])

  if (loading) return <p>Loading orders...</p>

  if (error) return <p className="text-red-500">{error}</p>

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Orders</h1>

      <div className="space-y-4">
        {orders.map((order) => (
          <div
            key={order._id}
            className="border rounded-lg p-4 bg-white shadow"
          >
            <p>
              <strong>Order ID:</strong> {order._id}
            </p>

            <p>
              <strong>User:</strong> {order.user?.name}
            </p>

            <p>
              <strong>Email:</strong> {order.user?.email}
            </p>

            <p>
              <strong>Total:</strong> ${order.totalPrice}
            </p>

            <p>
              <strong>Items:</strong> {order.items.length}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}

import api from '../utils/api'

// remove the headers object too - interceptor handles it automatically
await api.post('/orders', {
  items: cartItems,
  shippingAddress: { address, city, country },
  totalPrice,
})
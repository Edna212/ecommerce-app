const asyncHandler = require('../utils/asyncHandler')
const Order = require('../models/order')

const createOrder = asyncHandler(async (req, res) => {
  const { items, shippingAddress, totalPrice } = req.body
  const order = await Order.create({ user: req.user._id, items, shippingAddress, totalPrice })
  res.status(201).json(order)
})

const getMyOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user._id })
  res.json(orders)
})

const getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate('user', 'name email')
  if (!order) {
    res.status(404)
    throw new Error('Order not found')
  }
  res.json(order)
})

module.exports = { createOrder, getMyOrders, getOrderById }
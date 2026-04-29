const express = require('express')
const router = express.Router()

const {
  createOrder,
  getMyOrders,
  getOrderById,
  getAllOrders
} = require('../controllers/orderController')

const { protect } = require('../middleware/authMiddleware')
const adminMiddleware = require('../middleware/adminMiddleware')

router
  .route('/')
  .post(protect, createOrder)
  .get(protect, adminMiddleware, getAllOrders)

router.route('/myorders').get(protect, getMyOrders)

router.route('/:id').get(protect, getOrderById)

module.exports = router

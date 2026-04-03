const asyncHandler = require('../utils/asyncHandler')
const Product = require('../models/product')

const getProducts = asyncHandler(async (req, res) => {
  const keyword = req.query.search
    ? { name: { $regex: req.query.search, $options: 'i' } }
    : {}
  const products = await Product.find(keyword)
  res.json(products)
})

const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id)
  if (!product) {
    res.status(404)
    throw new Error('Product not found')
  }
  res.json(product)
})

const createProduct = asyncHandler(async (req, res) => {
  const product = await Product.create(req.body)
  res.status(201).json(product)
})

const updateProduct = asyncHandler(async (req, res) => {
  const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true })
  res.json(product)
})

const deleteProduct = asyncHandler(async (req, res) => {
  await Product.findByIdAndDelete(req.params.id)
  res.json({ message: 'Product deleted' })
})

module.exports = { getProducts, getProductById, createProduct, updateProduct, deleteProduct }
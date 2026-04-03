const asyncHandler = require('../utils/asyncHandler')
const jwt = require('jsonwebtoken')
const User = require('../models/user')

const generateToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '7d' })

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body
  const exists = await User.findOne({ email })
  if (exists) {
    res.status(400)
    throw new Error('Email already in use')
  }
  const user = await User.create({ name, email, password })
  res.status(201).json({
    _id: user._id, name: user.name,
    email: user.email, isAdmin: user.isAdmin,
    token: generateToken(user._id),
  })
})

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body
  const user = await User.findOne({ email })
  if (!user || !(await user.matchPassword(password))) {
    res.status(401)
    throw new Error('Invalid email or password')
  }
  res.json({
    _id: user._id, name: user.name,
    email: user.email, isAdmin: user.isAdmin,
    token: generateToken(user._id),
  })
})

const getMe = asyncHandler(async (req, res) => {
  res.json(req.user)
})

module.exports = { registerUser, loginUser, getMe }
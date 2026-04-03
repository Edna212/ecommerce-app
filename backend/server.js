const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
require('dotenv').config()
const { errorHandler, notFound } = require('./middleware/errorMiddleware')

const app = express()

app.use(cors({ origin: 'http://localhost:5173' }))
app.use(express.json())

app.use('/api/v1/users',    require('./routes/userRoutes'))
app.use('/api/v1/products', require('./routes/productRoutes'))
app.use('/api/v1/orders',   require('./routes/orderRoutes'))

// Must be AFTER routes
app.use(notFound)
app.use(errorHandler)

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB connected')
    app.listen(5000, () => console.log('Server running on port 5000'))
  })
  .catch(err => console.log(err))
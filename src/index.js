const express = require('express')
const cors = require('cors')
const authRoutes = require("./Routes/AuthRoutes")
const bodyParser = require('body-parser') 
const dotenv = require('dotenv');
const path = require('path');

dotenv.config();


const app = express()
app.use(bodyParser.json()); // Middleware to parse JSON bodies
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.json())
app.use(cors())

app.use('/api/auth', authRoutes)
app.use(express.static(path.join(__dirname, '..', 'public')));

app.get('/',(req,res)=>{
  try {
    res.sendFile(path.join(__dirname, '..', 'public', 'index.html'))
  } catch (res) {
    
  }
})



const authRouters = require('./Routes/AuthRoutes')
app.use('/auth',authRouters)

const userRouters = require('./Routes/User.Routes')
app.use('/api/users',userRouters)




const AdminProductRoutes = require('./Routes/AdminProductRoutes')
app.use('/api/admin/products',AdminProductRoutes)

const CustomerProductRoutes = require('./Routes/CustomerProductRoutes')
app.use('/api/products',CustomerProductRoutes)

const CartRoutes = require('./Routes/CartRoutes')
app.use('/api/cart',CartRoutes)

const CartItemRoutes = require('./Routes/CartItemRoutes')
app.use('/api/cartitem',CartItemRoutes)

const CustomerOrderRoutes =require('./Routes/CustomerOrderRoutes')
app.use('/api/order',CustomerOrderRoutes)

const AdminOrderRoutes = require('./Routes/AdminOrderRoutes')
app.use('./api/admin_order',AdminOrderRoutes)

const RatingRoutes = require('./Routes/RatingRoutes')
app.use('/api/rating',RatingRoutes)

const ReviewRoutes = require('./Routes/ReviewRoutes')
app.use('/api/reviews',ReviewRoutes)

module.exports = app
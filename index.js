const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const userRoute = require('./routes/user');
const authRoute = require('./routes/auth');
const productRoute = require('./routes/products');
const cartRoute = require('./routes/cart');
const orderRoute = require('./routes/order');
const stripeRoute = require('./routes/stripe');
const cors = require('cors');
const path = require('path');


dotenv.config();

mongoose.connect(process.env.MONGO_URL)
	.then(()=>console.log('DBConnect Success.'))
	.catch((err)=>{console.log('err')});

app.use(cors());
app.use(express.json());

app.get('/', (req,res)=> {
	res.send('Success');
});

app.use('/api/auth', authRoute);
app.use('/api/user', userRoute);
app.use('/api/products', productRoute);
app.use('/api/cart', cartRoute);
app.use('/api/order', orderRoute);
app.use('/api/checkout', stripeRoute);


app.listen(process.env.PORT || 5000, () => {
	console.log('Server is running');
});
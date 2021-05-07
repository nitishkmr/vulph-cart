import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import productRoutes from './routes/productRoutes.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';
import morgan from 'morgan'; //for logging
const app = express();
dotenv.config();

connectDB();

app.use(morgan('dev')); // to be used before other routes, will log all the calls made

app.get('/', (req, res) => {
  res.send('API is running...');
});

app.use('/api/products', productRoutes); // This is also a middleware, connects the routes

// error middlewares below, i.e. if any url is not hit till now then wrong url is entered
// same for other errors as well.. if error is being generated so for it also, there will be a middleware
app.use(notFound); // wrong url handler
app.use(errorHandler); // other errors

const PORT = process.env.PORT || 5000;
app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);

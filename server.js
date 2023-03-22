import express from "express";
import dotenv from "dotenv";
import connectDB from './config/db.js';

import products from './routes/productRoutes.js'


dotenv.config({ path: "./config/config.env" });

const app = express();

connectDB();

// Body parser middleware
app.use(express.json());

app.use('/api/v1/products',products)

const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);

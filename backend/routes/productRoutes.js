import express from 'express';
import asyncHandler from 'express-async-handler';

const router = express.Router();
import Product from '../models/productModel.js';

// @desc Fetch all products
// @route GET/api/products
// @access Public(no token req)
router.get(
  '/',
  asyncHandler(async (req, res) => {
    // Normally all the mongoose op will require try catch so for that we are using asyncHandler.
    const products = await Product.find({});
    res.json(products);
  })
);

// @desc Fetch single products
// @route GET/api/products/:id
// @access Public(no token req)
router.get(
  '/:id',
  asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ message: 'Product not found' }); //wont work here
    }
  })
);

export default router;

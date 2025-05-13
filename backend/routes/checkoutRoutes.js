const express = require('express');
const Checkout = require('../models/Checkout');
const Cart = require('../models/Cart');
const Product = require('../models/Product');
const Order = require('../models/Order');

const { protect } = require('../middleware/authMiddleware');

// POST / api / checkout
// CREATE  A NEW CHECKOUT SESSION
//ACCESS PRIVATE

router.post('/', protect, async (req, res) => {
  const { checkoutItems, shippingAddress, paymentMethod, totalPrice } =
    req.body;

  if (!checkoutItems || checkoutItems.length === 0) {
    return res.status(400).json({
      message: 'NO ITEMS IN CHECKOUT',
    });
  }
  try {
  } catch (error) {}
});

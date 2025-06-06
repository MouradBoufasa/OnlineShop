const express = require('express');
const Order = require('../models/Order');

const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

// @route GET /api/orders/my-orders
// GET  LOGGED-IN USER'S orders
// PRIVATE

router.get('/my-orders', protect, async (req, res) => {
  try {
    //FIND ORDERS FOR AUTHENTICATED USERS
    const orders = await Order.find({
      user: req.user._id,
    }).sort({
      createdAt: -1,
    });
    res.json(orders);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'SERVER ERROR' });
  }
});

// GET /api/orders/:id
// GET ORDER DETAILS  BY ID
//  PRIVATE

router.get('/:id', protect, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate(
      'user',
      'name email'
    );
    if (!order) {
      return res.status(404).json({ message: 'ORDER NOT FOUND' });
    }

    //RETURN the full order  details
    res.json(order);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'SERVER ERROR' });
  }
});

module.exports = router;

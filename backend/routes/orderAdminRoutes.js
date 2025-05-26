const express = require('express');
const Order = require('../models/Order');
const { protect, admin } = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/', protect, admin, async (req, res) => {
  try {
    const orders = await Order.find({}).populate('user', 'name email');
    res.status(200).json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'SERVER ERROR' });
  }
});

//PUT /api/admin/order/:id
//Update order status
//Private admin

router.put('/:id', protect, admin, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (order) {
      order.status = req.body.status || order.status;
      order.isDelivered === 'Delivered' ? true : order.isDelivered;
      order.deliveredAt =
        req.body.status === 'Delivered' ? Date.now() : order.deliveredAt;

      const updatedOrder = await order.save();
      res.json(updatedOrder);
    } else {
      res.status(404).json({ message: 'ORDER NOT FOUND' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'SERVER ERROR' });
  }
});

//DELETE /api/admin/orders/:id
//DELETE an order
//Private admin

router.delete('/:id', protect, admin, async (req, res) => {
  try {
    const order = Order.findById(req.params.id);
    if (order) {
      await order.deleteOne();
      res.json({ message: 'Order removed' });
    } else {
      res.status(404).json({ message: 'Order not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'SERVER ERROR' });
  }
});

module.exports = router;

const express = require('express');
const Checkout = require('../models/Checkout');
const Cart = require('../models/Cart');
const Product = require('../models/Product');
const Order = require('../models/Order');

const { protect } = require('../middleware/authMiddleware');

const router = express.Router();
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
    //Create a new checkout session
    const newCheckout = await Checkout.create({
      user: req.user._id,
      checkoutItems: checkoutItems,
      shippingAddress,
      paymentMethod,
      totalPrice,
      paymentStatus: 'Pending',
      isPaid: false,
    });
    res.status(201).json(newCheckout);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'SERVER ERROR',
    });
  }
});

// PUT /api/checkout/:id/pay
// Update checkout to  mark as paid after successful payment

router.put('/:id/pay', protect, async (req, res) => {
  const { paymentStatus, paymentDetails } = req.body;

  try {
    const checkout = await Checkout.findById(req.params.id);
    if (!checkout) {
      return res.status(404).json({ message: 'checkout not found' });
    }
    if (paymentStatus === 'paid') {
      checkout.isPaid = true;
      checkout.paymentStatus = paymentStatus;
      checkout.paymentDetails = paymentDetails;
      checkout.paidAt = Date.now();
      await checkout.save();
      res.status(200).json(checkout);
    } else {
      res.status(400).json({ message: 'INVALIDE PAYMENT STATUS' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'SERVER ERROR' });
  }
});

//POST /api/checkout/:id/finalize
//Finalizecheckout and convertt to an order after payment confirmation

router.post('/:id/finalize', protect, async (req, res) => {
  try {
    const checkout = await Checkout.findById(req.params.id);
    if (!checkout) {
      return res.status(404).json({ message: 'checkout  not found' });
    }
    if (checkout.isPaid && !checkout.isFinalized) {
      //Create final  order  based on the checkout details
      const finalOrder = await Order.create({
        user: checkout.user,
        orderItems: checkout.checkoutItems,
        shippingAddress: checkout.shippingAddress,
        paymentMethod: checkout.paymentMethod,
        totalPrice: checkout.totalPrice,
        isPaid: true,
        paidAt: checkout.paidAt,
        isDelivered: false,
        paymentStatus: 'paid',
        paymentDetails: checkout.paymentDetails,
      });
      //Mark the checkout as finalized
      checkout.isFinalized = true;
      checkout.finalizedAt = Date.now();
      await checkout.save();
      // Delete  the cart  associated  with the user
      await Cart.findOneAndDelete({ user: checkout.user });
      res.status(201).json(finalOrder);
    } else if (checkout.isFinalized) {
      res.status(400).json({ message: 'Checkout  is already finalized' });
    } else {
      res.status(400).json({ message: 'Checkout  is not paid' });
      console.log(checkout.isPaid);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'SERVER ERROR' });
  }
});

module.exports = router;
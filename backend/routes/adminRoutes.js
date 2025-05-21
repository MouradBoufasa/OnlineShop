const express = require('express');
const User = require('../models/User');

const { protect, admin } = require('../middleware/authMiddleware');

const router = express.Router();

// Get /api/admin/users
//GET ALL USERS(Admin only)
//PRIVATE ADMIN

router.get('/users', protect, admin, async (req, res) => {
  try {
    const users = await User.find({});
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'SERVER ERROR' });
  }
});

//POST /api/admin/users
//ADD a new user (admin only)
//PRIVATE ADMIN

router.post('/users', protect, admin, async (req, res) => {
  const { name, email, password, role } = req.body;
  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: 'USER ALREADY EXISTS' });
    }
    user = new User({
      name,
      email,
      password,
      role: role || 'customer',
    });
    await user.save();
    res.status(201).json({ message: 'USER CREATED SUCCESSFULLY', user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'SERVER ERROR' });
  }
});

module.exports = router;

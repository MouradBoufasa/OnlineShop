const express = require('express');
const User = require('../models/User');

const { protect, admin } = require('../middleware/authMiddleware');

const router = express.Router();

// Get /api/admin/users
//GET ALL USERS(Admin only)
//PRIVATE ADMIN

router.get('/', protect, admin, async (req, res) => {
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

router.post('/', protect, admin, async (req, res) => {
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

//PUT /api/admin/users/:id
//Update user info (admin only) Name,email and role
//Private/Admin

router.put('/:id', protect, admin, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (user) {
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;
      user.role = req.body.role || user.role;
    }
    console.log(
      '$2b$12$GVBZpREZ8vxIAkSCmWYIVOgUolVrx56NOKez9bzCNfGYgR6hIMovy'.length
    );
    const updatedUser = await user.save();
    res.json({ message: 'USER UPDATED', user: updatedUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'SERVER ERROR' });
  }
});

// DELETE /api/admin/users/:id
//DELETE USER (admin only)
//Private/Admin

router.delete('/:id', protect, admin, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (user) {
      await user.deleteOne();
      res.json({ message: 'USER DELETED SUCCESSFULLY' });
    } else {
      res.status(404).json({ message: 'USER NOT FOUND' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'SERVER ERROR' });
  }
});

module.exports = router;

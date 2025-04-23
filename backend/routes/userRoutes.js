const express = require("express");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const { protect } = require("../middleware/authMiddleware");
const router = express.Router();

//@Route POST /api/users/register

router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({
        message: "USER ALREADY EXISTS",
      });
    } else user = new User({ name, email, password });
    await user.save();
    //   create JWT payload
    const payload = { user: { id: user._id, role: user.role } };

    //   Sign and return the token along with user data
    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: "1d" },
      (err, token) => {
        if (err) throw err;
        //Send the use and token in response
        res.status(201).json({
          user: {
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
          },
          token,
        });
      }
    );
  } catch (err) {
    console.log(err);
    res.status(500).send("SERVER ERROR");
  }
});

// @Route post /api/users/login

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "INVALID CREDENTIALS" });
    }

    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: "INVALID PASSWORD" });
    }

    const payload = { user: { id: user._id, role: user.role } };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: "1d" },
      (err, token) => {
        if (err) throw err;
        res.status(200).json({
          user: {
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
          },
          token,
        });
      }
    );
  } catch (err) {
    console.error("Login error:", err.message);
    res.status(500).send("SERVER ERROR");
  }
});
// GET THE LOGGED IN USERS PROFILE CREDENTIALS

router.get("/profile", protect, async (req, res) => {
  res.json(req.user);
});

module.exports = router;

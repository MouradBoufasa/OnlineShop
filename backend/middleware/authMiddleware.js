const jwt = require("jsonwebtoken");
const User = require("../models/User");

//Middleware to protect routes
const protect = async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.toLowerCase().startsWith("bearer")
  ) {
    // console.log(req.headers.authorization);
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.user.id).select('-password');
      next();
    } catch (error) {
      console.error('Token verification failed', error);
      res.status(401).json({
        message: 'TOKEN failed NOT AUTHORIZED',
      });
    }
  } else {
    res.status(401).json({
      message: "NOT AUTHORIZED NO TOKEN PROVIDED",
    });
  }
};

const admin = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    res.status(403).json({ message: 'NOT AUTHORIZED AS AN ADMIN' });
  }
};

module.exports = { protect, admin };

const express = require("express");
const Product = require("../models/Product");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

//Post /api/products
//Create a new product
//Access private/admin

router.post("/", protect, async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      discountPrice,
      countInStock,
      category,
      brand,
      sizes,
      colors,
      collections,
      material,
      gender,
      images,
      isFeatured,
      isPublished,
      tags,
      dimensions: { length, width, height },
      weight,
      sku,
    } = req.body;

    const product = new Product({
      name,
      description,
      price,
      discountPrice,
      countInStock,
      category,
      brand,
      sizes,
      colors,
      collections,
      material,
      gender,
      images,
      isFeatured,
      isPublished,
      tags,
      dimensions: { length, width, height },
      weight,
      sku,
      user: req.user._id, // Reference to the admin whos creating the product
    });
    const createdProduct = await product.save();
    res.status(201).json({ message: createdProduct });
  } catch (error) {
    console.error(error);
    res.status(400).send("SERVER ERROR");
  }
});

module.exports = router;

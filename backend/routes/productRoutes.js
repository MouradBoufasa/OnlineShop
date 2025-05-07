const express = require("express");
const Product = require("../models/Product");
const { protect, admin } = require("../middleware/authMiddleware");

const router = express.Router();

//Post /api/products
//Create a new product
//Access private/admin

router.post("/", protect, admin, async (req, res) => {
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

// PUT /api/products/:id
// Update an existing product ID
// Private/Admin

router.put("/:id", protect, admin, async (req, res) => {
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
      dimensions,
      length,
      width,
      height,
      weight,
      sku,
    } = req.body;
    const product = await Product.findById(req.params.id);
    if (product) {
      //Update product fields
      product.name = name || product.name;
      product.description = description || product.description;
      product.price = price || product.price;
      product.discountPrice = discountPrice || product.discountPrice;
      product.countInStock = countInStock || product.countInStock;
      product.category = category || product.category;
      product.brand = brand || product.brand;
      product.sizes = sizes || product.sizes;
      product.colors = colors || product.colors;
      product.collections = collections || product.collections;
      product.material = material || product.material;
      product.gender = gender || product.gender;
      product.images = images || product.images;
      product.isFeatured =
        isFeatured !== undefined ? isFeatured : product.isFeatured;
      product.isPublished =
        isPublished !== undefined ? isPublished : product.isPublished;
      product.tags = tags || product.tags;
      product.dimensions = dimensions || product.dimensions;
      product.dimensions.length = length || product.dimensions.length;
      product.dimensions.width = width || product.dimensions.width;
      product.dimensions.height = height || product.dimensions.height;
      product.weight = weight || product.weight;
      product.sku = sku || product.sku;

      const updatedProduct = await product.save();
      res.json(updatedProduct);
    } else {
      res.status(404).json({
        message: "Product not found",
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("SERVER ERROR");
  }
});

// DELETE /api/:id
// DELETE A PRODUCT By ID

router.delete("/:id", protect, admin, async (req, res) => {
  try {
    // Find Product by ID
    const product = await Product.findById(req.params.id);
    if (product) {
      await product.deleteOne();
      res.json({ message: "product removed with success" });
    } else {
      res.status(404).json({ message: "Product not found or already deleted" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("SERVER ERROR");
  }
});


// GET /api/products
// GET ALL PRODUCTS WITH  OPTIONAL QUERY FILTERS
router.get('/', async (req, res) => {
  try {
    const { collection, size, color, gender, minPrice, maxPrice, sortBy, search, category, material, brand, limit } = req.body;
    let query = {}
    
    //FILTER LOGIC
    if (collection && collection.toLocalLowerCase() !== "all") {
  query.collection=collection
}
    if (category && category.toLocalLowerCase() !== "all") {
  query.category=category
}
    if (material) {
  query.material={$in:material.split(',')}
}
    if (brand) {
  query.brand={$in:brand.split(',')}
}
    if (size) {
  query.size={$in:size.split(',')}
}
    if (color) {
  query.colors={$in:[color]}
}
    if (gender) {
  query.gender=gender
    }
    if (minPrice || maxPrice) {
      query.price = {}
      if(minPrice) query.price.gte = Number(minPrice)
      if(maxPrice) query.price.lte = Number(maxPrice)
}
    if (search) {
      query.$or = [
        { name: { $regex:search,$option:"i"}},
        { description: { $regex:search,$option:"i"}}
  ]
    }
    //SORT LOGIC
    if (sortBy) {
      switch (sortBy) {
        case "priceAsc":
          sort = { price: 1 }
          break
        case "priceDesc":
          sort = { price: -1 }
          break
      }
    }
  } catch (error) {
    
  }
})


module.exports = router;
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Product = require("./models/Product");
const User = require("./models/User");
const products = require("./data/products");

dotenv.config();

mongoose.connect(process.env.MONGO_URI);

const seedData = async () => {
  try {
    //Clear existing data
    await Product.deleteMany();
    await User.deleteMany();
    console.log("Deleted data with success");
    //create default admin
    const createdUser = await User.create({
      name: "Admin User",
      email: "admin@example.com",
      password: "Obito123456",
      role: "admin",
    });
    const userID = createdUser._id;
    const sampleProducts = products.map((product) => {
      return { ...product, user: userID };
    });
    await Product.insertMany(sampleProducts);
    console.log("PRODUCT DATA SEEDED SUCCESSFULLY");
    process.exit();
  } catch (error) {
    console.error(error, "error seeding the data");
    process.exit(1);
  }
};

seedData();

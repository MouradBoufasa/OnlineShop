const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const app = express();
const connectDB = require("./config/db");

const userRoutes = require("./routes/userRoutes");

app.use(express.json());
app.use(cors());

dotenv.config();

const PORT = process.env.PORT || 3000;

//CONNECT TO MONGODB

connectDB();

app.get("/", (req, res) => {
  res.send("WELCOME TO RABBIT API");
});

//API Routes

app.use("/api/users", userRoutes);

app.listen(PORT, () => {
  console.log(`SERVER IS RUNNING ON PORT : , ${PORT} `);
});

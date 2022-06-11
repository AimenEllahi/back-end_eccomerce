import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
const app = express();
import path from "path";
import { fileURLToPath } from "url";
//routes
import productRoute from "./routes/product.js";
import userRoute from "./routes/user.js";

//Configuration
dotenv.config();

const PORT = process.env.PORT || 8800;
// const db = mongoose.connection
// db.on('error', (error) => console.error(error))
// db.once('open',() => console.log('Connected to database'))
const __filename = fileURLToPath(import.meta.url); //
const __dirname = path.dirname(__filename);
app.use("/uploads", express.static("uploads"));
app.use(bodyParser.json()); // for parsing application/json

app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(cors()); //

// 👇️ "/home/john/Desktop/javascript"

//importing routes

app.use("/products", productRoute);
app.use("/users", userRoute);

//routes
app.get("/", (req, res) => {
  res.send("We are on home page");
});

mongoose.connect(
  process.env.MongoDB_URL,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => console.log("connected to db")
);

//listens on port 3001
app.listen(PORT, () => console.log("Server Started"));

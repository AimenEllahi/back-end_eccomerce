import Product from "../models/Product.js";
import mongoose from "mongoose";
import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);

// 👇️ "/home/john/Desktop/javascript"
const __dirname = path.dirname(__filename); //
//to get single product
export const getProduct = async (req, res) => {
  const { id } = req.params;

  try {
    //check if product exists
    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(404).send("product not found");

    const product = await Product.findById(id);

    res.status(200).json(product);
  } catch (err) {
    res.status(404).json({ message: err });
  }
};

//to get all products
export const getProducts = async (req, res) => {
  try {
    console.log("hello");
    const product = await Product.find();
    res.status(200).json(product);
  } catch (err) {
    res.status(404).json({ message: err });
  }
};

//to create product
export const createProduct = async (req, res) => {
  const { title, desc, price } = req.body;
  // console.log(req.body);
  // console.log(req.file);
  console.log("Creating Product");
  const product = new Product({
    title,
    desc,
    price,
    productImage: req.file.filename,
  });

  try {
    //console.log(product);
    const savedProduct = await product.save();
    //console.log(savedProduct);
    res.status(200).json(savedProduct);
  } catch (err) {
    res.json({ message: err });
  }
};

//to update product
export const updateProduct = async (req, res) => {
  // console.log("We are here");
  const { id } = req.params;
  const { title, desc, price } = req.body;
  // console.log(title, desc, price);

  try {
    //check if product exists
    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(404).send("product not found");
    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      { id, title, desc, price },
      { new: true }
    );
    res.json({ message: "product successfully updated" });
  } catch (err) {
    res.json({ message: err });
  }
};

//to delete product
export const deleteProduct = async (req, res) => {
  const { id } = req.params;
  console.log("Deleting Product");
  try {
    //check if product exists
    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(404).send("product not found");

    await Product.findByIdAndRemove(id);
    res.json({ message: "product successfully deleted" });
  } catch (err) {
    res.json({ message: err });
  }
};

export const getImage = async (req, res) => {
  const { id } = req.params;
  console.log(id);
  try {
    //check if image exists
    res.send(path.join(__dirname, "../uploads/" + id));

    //res.status(200).json(product);
  } catch (err) {
    console.log(err);
    res.status(404).json({ message: err });
  }
};

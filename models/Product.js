import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      require: true,
      min: 3,
      max: 20,
      unique: true,
    },
    desc: {
      type: String,
      max: 50,
    },
    price: {
      type: String,
      max: 50,
    },
    productImage: { type: String, required: true },
  },
  { timestamps: true }
);

const product = mongoose.model("Product", ProductSchema);
export default product;

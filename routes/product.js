import express from "express";
import {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  getImage,
} from "../controller/product.js";
import admin from "../middlewares/admin.js";
import auth from "../middlewares/auth.js";
import multer from "multer";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, new Date().toISOString().replace(/:/g, "-") + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  // reject a file
  if (
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/webp"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
});

//const upload = multer({ dest: "uploads/" });

const router = express.Router();

router.get("/:id", getProduct);
router.get("/", getProducts);
router.post("/", auth, admin, upload.single("productImage"), createProduct);
router.patch("/:id", auth, admin, updateProduct);
router.delete("/:id", auth, admin, deleteProduct);
router.get("/image/:id", getImage);

export default router;

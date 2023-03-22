import express from "express";
import {
  addProduct,
  getProducts,
  getProductById,
  getActiveProducts,
  deleteProduct,
  deleteAllProducts,
  updateProduct,
} from "../controller/productController.js";
const router = express.Router();

router.route("/").get(getProducts).post(addProduct).delete(deleteAllProducts);

router.route("/active").get(getActiveProducts);

router.route("/:id").get(getProductById).delete(deleteProduct).patch(updateProduct);

export default router;

import express from "express";
import {
  addProduct,
  getProducts,
  getProductById,
  getActiveProducts,
} from "../controller/productController.js";
const router = express.Router();

router.route("/").get(getProducts).post(addProduct);

router.route("/active").get(getActiveProducts);

router.route("/:id").get(getProductById);

export default router;

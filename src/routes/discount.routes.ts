import express from "express";
// Controllers
import DiscountController from "../controllers/discount.controller";
import authMiddleware from "../middlewares/auth.middleware";
import { upload } from "../middlewares/file.middleware";

const router = express.Router();

// Обработка запросов
router.get("/discounts", DiscountController.getDiscounts);
router.get("/discounts/:id", DiscountController.getDiscount);
router.post(
  "/discounts",
  authMiddleware,
  upload,
  DiscountController.addDiscount,
);
router.patch(
  "/discounts/:id",
  authMiddleware,
  upload,
  DiscountController.updateDiscount,
);
router.delete(
  "/discounts/:id",
  authMiddleware,
  DiscountController.deleteDiscount,
);

export default router;

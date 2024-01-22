import express from "express";
// Controllers
import FurnitureController from "../controllers/furniture.controller";
import authMiddleware from "../middlewares/auth.middleware";
import { uploadMany } from "../middlewares/file.middleware";

const router = express.Router();

// Обработка запросов
router.get("/furniture-main", FurnitureController.getMainFurniture);
router.get("/all-furniture", FurnitureController.getAllFurniture);
router.get("/furniture/:id", FurnitureController.getOneFurniture);
router.post(
  "/furniture",
  authMiddleware,
  uploadMany,
  FurnitureController.addFurniture,
);
router.patch(
  "/furniture/:id",
  authMiddleware,
  uploadMany,
  FurnitureController.updateFurniture,
);
router.delete(
  "/furniture/:id",
  authMiddleware,
  FurnitureController.deleteFurniture,
);

export default router;

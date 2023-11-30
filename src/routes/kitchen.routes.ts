import express from 'express';
// Controllers
import KitchenController from '../controllers/kitchen.controller';
import authMiddleware from '../middlewares/auth.middleware';
import { uploadMany } from '../middlewares/file.middleware';

const router = express.Router();

// Обработка запросов
router.get("/kitchens-main", KitchenController.getMainKitchens);
router.get("/kitchens", KitchenController.getKitchens);
router.get("/kitchens/:id", KitchenController.getKitchen);
router.post("/kitchens", authMiddleware, uploadMany, KitchenController.addKitchen )
router.patch("/kitchens/:id", authMiddleware, uploadMany, KitchenController.updateKitchen);
router.delete("/kitchens/:id", authMiddleware, KitchenController.deleteKitchen);

export default router;
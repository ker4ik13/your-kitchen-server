import express from 'express';
// Controllers
import KitchenController from '../controllers/kitchen.controller';
import authMiddleware from '../middlewares/auth.middleware';

const router = express.Router();

// Обработка запросов
router.get("/kitchens", KitchenController.getKitchens);
router.get("/kitchens/:id", KitchenController.getKitchen);
router.post("/kitchens", authMiddleware, KitchenController.addKitchen);
router.patch("/kitchens/:id", authMiddleware, KitchenController.updateKitchen);
router.delete("/kitchens/:id", authMiddleware, KitchenController.deleteKitchen);

export default router;
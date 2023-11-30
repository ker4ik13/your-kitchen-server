import express from 'express';
// Controllers
import WorkerController from '../controllers/worker.controller';
import authMiddleware from '../middlewares/auth.middleware';
import { upload } from '../middlewares/file.middleware';

const router = express.Router();

// Обработка запросов
router.get("/workers", WorkerController.getWorkers);
router.get("/workers/:id", WorkerController.getWorker);
router.post("/workers", authMiddleware, upload, WorkerController.addWorker);
router.patch("/workers/:id", authMiddleware, upload, WorkerController.updateWorker);
router.delete("/workers/:id", authMiddleware, WorkerController.deleteWorker);

export default router;
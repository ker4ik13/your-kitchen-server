import express from 'express';
// Controllers
import ArticleController from '../controllers/article.controller';
import authMiddleware from '../middlewares/auth.middleware';
import { uploadMany } from '../middlewares/file.middleware';

const router = express.Router();

// Обработка запросов
router.get("/articles-main", ArticleController.getMainArticles);
router.get("/articles", ArticleController.getArticles);
router.get("/articles/:id", ArticleController.getArticle);
router.post("/articles", authMiddleware, uploadMany, ArticleController.addArticle);
router.patch("/articles/:id", authMiddleware, ArticleController.updateArticle);
router.delete("/articles/:id", authMiddleware, ArticleController.deleteArticle);

export default router;
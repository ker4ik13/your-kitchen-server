import type { Request, Response } from "express";
import articleService from "../services/article.service";
import ApiError from "../exceptions/api.error";
import fs from 'fs';
import path from "path";

class ArticleController {
    async getMainArticles (request: Request, response: Response) {
        try {
            const result = await articleService.getMainArticles();
            response.status(200).json(result);
        } catch (error) {
            throw ApiError.InternalServerError('Ошибка получения главных статей');
        }
    };

    async getArticles (request: Request, response: Response) {
        try {
            const result = await articleService.getArticles();
            response.status(200).json(result);
        } catch (error) {
            throw ApiError.InternalServerError('Ошибка получения статей');
        }
    };

    async getArticle (request: Request, response: Response) {
        try {
            const result = await articleService.getArticle(request.params.id);
            response.status(200).json(result);
        } catch (error) {
            throw ApiError.InternalServerError('Ошибка получения статьи');
        }
    };

    async viewArticle (request: Request, response: Response) {
        try {
            const result = await articleService.viewArticle(request.params.id);
            response.status(200).json(result);
        } catch (error) {
            throw ApiError.InternalServerError('Ошибка увеличения просмотров статьи');
        }
    };

    async addArticle (request: Request, response: Response) {
        if (!request.files || Object.keys(request.files).length === 0) {
            throw ApiError.BadRequest('Нет файлов для загрузки');
        }
        try {
            const result = await articleService.addArticle(request.body, request.files);
            response.status(201).json(result);
        }
        catch (error) {
            throw ApiError.InternalServerError('Ошибка добавления статьи');
        }
    };

    async deleteArticle (request: Request, response: Response) {
        try {
            const result = await articleService.deleteArticle(request.params.id);
            response.status(200).json(result);

            fs.unlink(path.join(__dirname, `../../images/${result?.preview}`), err => {
                if(err){
                    console.log(err);
                } else {
                    console.log(`Файл ${result?.preview} удалён`);
                }
            });
        } catch (error) {
            throw ApiError.InternalServerError('Ошибка удаления статьи');
        }
    };

    async updateArticle (request: Request, response: Response) {
        try {
            const result = await articleService.updateArticle(request.params.id, request.body);
            response.status(200).json(result);
        } catch (error) {
            throw ApiError.InternalServerError('Ошибка обновления статьи');
        }
    };

}

export default new ArticleController();
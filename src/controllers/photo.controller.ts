import type { Request, Response } from "express";
import ApiError from "../exceptions/api.error";
import photoService from "../services/photo.service";
import fs from 'fs';
import path from "path";

class ClaimController {
    async getPhotos (request: Request, response: Response) {
        try {
            const result = await photoService.getPhotos();
            response.status(200).json(result);
        } catch (error) {
            throw ApiError.InternalServerError('Ошибка получения фотографий');
        }
    };

    async getPhoto (request: Request, response: Response) {
        try {
            const result = await photoService.getPhoto(request.params.id);
            response.status(200).json(result);
        } catch (error) {
            throw ApiError.InternalServerError('Ошибка получения фотографии');
        }
    };

    async addPhotos (request: Request, response: Response) {
        if (!request.files || Object.keys(request.files).length === 0) {
            throw ApiError.BadRequest('Нет фото для загрузки');
        }
        try {
            const result = await photoService.addPhotos(request.files);
            response.status(201).json(result);
        } catch (error) {
            throw ApiError.InternalServerError('Ошибка добавления фото');
        }
    };

    async deletePhoto (request: Request, response: Response) {
        try {
            const result = await photoService.deletePhoto(request.params.id);
            response.status(200).json(result);

            fs.unlink(path.join(__dirname, `../../images/${result?.name}`), err => {
                if(err){
                    console.log(err);
                } else {
                    console.log(`Файл ${result?.name} удалён`);
                }
            });
        } catch (error) {
            throw ApiError.InternalServerError('Ошибка удаления фото');
        }
    };
};

export default new ClaimController();
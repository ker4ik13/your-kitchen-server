import type { Request, Response } from "express";
import kitchenService from "../services/kitchen.service";
import ApiError from "../exceptions/api.error";

class KitchenController {
    async getKitchens (request: Request, response: Response) {
        try {
            const kitchen = await kitchenService.getKitchens();
            response.status(200).json(kitchen);
        } catch (error) {
            throw ApiError.InternalServerError('Ошибка получения кухни');
        }
    };

    async getKitchen (request: Request, response: Response) {
        try {
            const kitchen = await kitchenService.getKitchen(request.params.id);
            response.status(200).json(kitchen);
        } catch (error) {
            throw ApiError.InternalServerError('Ошибка получения кухни');
        }
    };

    async addKitchen (request: Request, response: Response) {
        try {
            const kitchen = await kitchenService.addKitchen(request.body);
            response.status(201).json(kitchen);
        } catch (error) {
            throw ApiError.InternalServerError('Ошибка добавления кухни');
        }
    };

    async deleteKitchen (request: Request, response: Response) {
        try {
            const kitchen = await kitchenService.deleteKitchen(request.params.id);
            response.status(200).json(kitchen);
        } catch (error) {
            throw ApiError.InternalServerError('Ошибка удаления кухни');
        }
    };

    async updateKitchen (request: Request, response: Response) {
        try {
            const kitchen = await kitchenService.updateKitchen(request.params.id, request.body);
            response.status(200).json(kitchen);
        } catch (error) {
            throw ApiError.InternalServerError('Ошибка обновления кухни');
        }
    };

}

export default new KitchenController();
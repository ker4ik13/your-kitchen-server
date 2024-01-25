import type { Request, Response } from "express";
import ApiError from "../exceptions/api.error";
import { deletePhotos } from "../helpers/deletePhotos";
import kitchenService from "../services/kitchen.service";

class KitchenController {
  async getMainKitchens(request: Request, response: Response) {
    try {
      const kitchen = await kitchenService.getMainKitchens();
      response.status(200).json(kitchen);
    } catch (error) {
      throw ApiError.InternalServerError("Ошибка получения кухни");
    }
  }

  async getKitchens(request: Request, response: Response) {
    try {
      const kitchens = await kitchenService.getKitchens();
      response.status(200).json(kitchens);
    } catch (error) {
      throw ApiError.InternalServerError("Ошибка получения кухни");
    }
  }

  async getKitchen(request: Request, response: Response) {
    try {
      const kitchen = await kitchenService.getKitchen(request.params.id);
      response.status(200).json(kitchen);
    } catch (error) {
      throw ApiError.InternalServerError("Ошибка получения кухни");
    }
  }

  async addKitchen(request: Request, response: Response) {
    if (!request.files || Object.keys(request.files).length === 0) {
      throw ApiError.BadRequest("Нет файлов для загрузки");
    }
    try {
      const kitchen = await kitchenService.addKitchen(
        request.body,
        request.files,
      );
      response.status(201).json(kitchen);
    } catch (error) {
      throw ApiError.InternalServerError("Ошибка добавления кухни");
    }
  }

  async deleteKitchen(request: Request, response: Response) {
    try {
      const kitchen = await kitchenService.deleteKitchen(request.params.id);
      response.status(200).json(kitchen);

      if (kitchen) {
        deletePhotos(kitchen.photos);
      }
    } catch (error) {
      throw ApiError.InternalServerError("Ошибка удаления кухни");
    }
  }

  async updateKitchen(request: Request, response: Response) {
    try {
      const kitchen = await kitchenService.updateKitchen(
        request.params.id,
        request.body,
      );
      response.status(200).json(kitchen);
    } catch (error) {
      throw ApiError.InternalServerError("Ошибка обновления кухни");
    }
  }
}

export default new KitchenController();

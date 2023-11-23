import type { Request, Response } from "express";
import { Worker } from "../models/worker.model";
import ApiError from "../exceptions/api.error";
import workerService from "../services/worker.service";

class WorkerController {
    async getWorkers (request: Request, response: Response) {
        try {
            const workers = await workerService.getWorkers();
            response.status(200).json(workers);
        } catch (error) {
            throw ApiError.InternalServerError('Ошибка получения работников');
        }
    };

    async getWorker (request: Request, response: Response) {
        try {
            const worker = await workerService.getWorker(request.params.id);
            response.status(200).json(worker);
        } catch (error) {
            throw ApiError.InternalServerError('Ошибка получения работника');
        }
    };

    async addWorker (request: Request, response: Response) {
        try {
            const worker = await workerService.addWorker(request.body)
            response.status(201).json(worker);
        } catch (error) {
            throw ApiError.InternalServerError('Ошибка добавления работника');
        }
    };

    async deleteWorker (request: Request, response: Response) {
        try {
            const worker = await workerService.deleteWorker(request.params.id);
            response.status(200).json(worker);
        } catch (error) {
            throw ApiError.InternalServerError('Ошибка удаления работника');
        }
    };

    async updateWorker (request: Request, response: Response) {
        try {
            const worker = await workerService.updateWorker(request.params.id, request.body);
            response.status(200).json(worker);
        } catch (error) {
            throw ApiError.InternalServerError('Ошибка обновления работника');
        }
    };

};

export default new WorkerController();
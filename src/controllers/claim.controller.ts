import type { Request, Response } from "express";
import claimService from "../services/claim.service";
import ApiError from "../exceptions/api.error";

class ClaimController {
    async getClaims (request: Request, response: Response) {
        try {
            const claims = await claimService.getClaims();
            response.status(200).json(claims);
        } catch (error) {
            throw ApiError.InternalServerError('Ошибка получения заявок');
        }
    };

    async getClaim (request: Request, response: Response) {
        try {
            const claim = await claimService.getClaim(request.params.id);
            response.status(200).json(claim);
        } catch (error) {
            throw ApiError.InternalServerError('Ошибка получения заявки');
        }
    };

    async addClaim (request: Request, response: Response) {
        try {
            const claim = await claimService.addClaim(request.body);
            response.status(201).json(claim);
        } catch (error) {
            throw ApiError.InternalServerError('Ошибка добавления заявки');
        }
    };

    async deleteClaim (request: Request, response: Response) {
        try {
            console.log(request.params.id);
            const claim = await claimService.deleteClaim(request.params.id);
            console.log(claim);
            response.status(200).json(claim);
        } catch (error) {
            throw ApiError.InternalServerError('Ошибка удаления заявки');
        }
    };

    async updateClaim (request: Request, response: Response) {
        try {
            const claim = await claimService.updateClaim(request.params.id, request.body);
            response.status(201).json(claim);
        } catch (error) {
            throw ApiError.InternalServerError('Ошибка обновления заявки');
        }
    };

};

export default new ClaimController();
import type { Response } from "express";

export const handleError = (response: Response, statusCode: number, error: string) => {
    response.status(statusCode).json({error});
}
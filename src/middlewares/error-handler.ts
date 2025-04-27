import { AppError } from "@/utils/AppError";
import { Request, Response, NextFunction } from "express";

export function errorHandler(error: any, req: Request, res :Response, _ :NextFunction) {
    if (error instanceof AppError) {
        return res.status(error.statusCode).json({
            status: "error",
            message: error.message,
        });
    }

    console.error(error);

    return res.status(500).json({
        status: "error",
        message: "Internal server error",
    });
    
}
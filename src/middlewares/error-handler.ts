import { AppError } from "@/utils/AppError";
import { Request, Response, NextFunction } from "express";
import { ZodError } from "zod";

export function errorHandler(error: any, req: Request, res :Response, _ :NextFunction) {
    if (error instanceof AppError) {
        return res.status(error.statusCode).json({
            status: "error",
            message: error.message,
        });
    }

    if (error instanceof ZodError) {
        return res.status(400).json({
            message: "Validation error",
            issues: error.format()
        });
    }

    console.error(error);

    return res.status(500).json({
        status: "error",
        message: "Internal server error",
    });
    
}
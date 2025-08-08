import { Request, Response, NextFunction } from "express";
import { ZodObject } from "zod";

export const validateBody = (schema: ZodObject) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const result = schema.safeParse(req.body);
        if (!result.success) {
            const errorMessages = (result.error as any).errors;
            return res.status(400).json({ errors: errorMessages });
        }

        req.body = result.data;
        next();
    };
};
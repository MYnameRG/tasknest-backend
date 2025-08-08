// middlewares/validate.ts
// import { ZodSchema } from "zod";
import { Request, Response, NextFunction } from "express";

export const RequestValidator = ({ bodySchema, querySchema, paramSchema }: any) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      if (querySchema) {
        req.query = querySchema?.parse(req.query);
      }

      if (paramSchema) {
        req.params = paramSchema?.parse(req.params);
      }

      if (bodySchema) {
        req.body = bodySchema?.parse(req.body);
      }

      next();
    } catch (error: any) {
      console.log(error);
      return res.status(400).json({ success: false, message: "Validation Errors!", errors: error });
    }
  };
}
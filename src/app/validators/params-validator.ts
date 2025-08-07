import { Request, Response, NextFunction } from "express";

export const validateParams = (schema: any) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const result = schema.parse(req.params);
    if (!result.success) {
      const errorMessages = (result.error as any).errors;
      return res.status(400).json({ errors: errorMessages });
    }

    req.params = result.data;
    next();
  };
};
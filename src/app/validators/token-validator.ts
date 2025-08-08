import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../helpers/auth.helper";

export const tokenValidator = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const authHeader = req?.headers?.authorization;
        if (!authHeader || !authHeader.startsWith("Bearer")) {
            return res.status(401).json({ success: false, message: "Authorization token missing or malformed!" });
        }

        const token = authHeader?.split(" ")[1];
        if (!token) {
            return res.status(401).json({ success: false, message: "Token is invalid!" });
        }

        const decoded = await verifyToken(token);
        if(!decoded) {
            return res.status(401).json({ success: false, message: "Token is expired or some reason!" });
        }

        // Attach decoded fields to request
        (req as any).id = decoded.id;
        (req as any).role = decoded.role;

        next();
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: "Internal Server Error!", error });
    }
}
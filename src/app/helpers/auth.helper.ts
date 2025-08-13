import jwt, { SignOptions, JwtPayload, Secret } from 'jsonwebtoken';
import CONFIG from "../config/env";

class AuthHelper {
    private static jwtSecret = CONFIG.JWT_SECRET as Secret;

    // Generate Token
    static createToken = async (payload: object, expiresIn = '1h') => {
        try {
            return jwt.sign(payload, this.jwtSecret, {
            } as SignOptions) as string;
        }
        catch (e) {
            console.error("Generating JWT Error: ", e);
            throw e;
        }
    }

    // Verify Token
    static verifyToken = async (token: string) => {
        try {
            return jwt.verify(token, this.jwtSecret) as JwtPayload;
        } catch (e) {
            console.error("Verification JWT Error: ", e);
            throw e;
        }
    }

    // Decode Token
    static decodeToken = async (token: string) => {
        try {
            return jwt.decode(token) as JwtPayload;
        } catch (e) {
            console.error("Decodation JWT Error: ", e);
            throw e;
        }
    }
}

export const {
    createToken,
    verifyToken,
    decodeToken
} = AuthHelper;
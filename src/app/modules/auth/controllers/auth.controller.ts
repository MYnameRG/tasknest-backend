
import { Request, Response } from 'express';
import MUser from '../../user/models/user.model';
import { createToken } from '../../../helpers/auth.helper';
import { hashPassword, verifyPassword } from '../../../helpers/hash-pwd.helper';

class AuthController {

    /**
     * @route POST /api/v1/auth/register
     */
    static registerUser = async (req: Request, res: Response) => {
        try {
            const { name, email, password } = req.body;

            const isExist = await MUser?.findOne({ email });
            if (isExist) {
                return res.status(400).json({ success: false, message: 'User already exists!' });
            }

            const hashedPassword = await hashPassword(password);

            await MUser?.create({
                name,
                email,
                password: hashedPassword
            });

            return res.status(201).json({ success: true, message: 'User registered successfully' });
        } catch (error) {
            console.log(error);
            return res.status(500).json({ success: false, message: 'Registration failed', error });
        }
    }

    /**
     * @route POST /api/v1/auth/login
     */
    static loginUser = async (req: Request, res: Response) => {
        try {
            const { email, password } = req.body;

            const user = await MUser?.findOne({ email });
            if (!user) {
                return res.status(401).json({ success: false, message: 'User not existed!' });
            }

            const isMatch = await verifyPassword(password, user.password);
            if (!isMatch) {
                return res.status(401).json({ success: false, message: 'Invalid credentials!' });
            }

            const payload = {
                userId: user._id,
                email: user.email,
                role: user.role,
            };

            const token = await createToken(payload);

            return res.status(200).json({
                success: true, message: 'Login successful', 
                token,
                user: {
                    id: user._id, name: user.name, email: user.email,
                },
            });
        } catch (error) {
            console.log(error);
            return res.status(500).json({ success: false, message: 'Login failed', error });
        }
    }
}

export const {
    registerUser,
    loginUser
} = AuthController;
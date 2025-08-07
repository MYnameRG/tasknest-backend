import bcrypt from 'bcryptjs';

class HashPwdHelper {

    // Hash Password
    static async hashPassword(password: string) {
        try {
            const hash = await bcrypt.hash(password, 10)
            return hash;
        }
        catch (e) {
            console.error("Hasing Password Error: ", e);
            throw e;
        }
    }

    // Verify Password
    static async verifyPassword(triedPassword: string, actualPassword: string) {
        try {
            const isCorrect = await bcrypt.compare(triedPassword, actualPassword);
            return isCorrect;
        } catch (e) {
            console.error("Verification JWT Error: ", e);
            throw e;
        }
    }
}

export const {
    hashPassword,
    verifyPassword
} = HashPwdHelper;
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';

const JWT_SECRET = process.env.JWT_SECRET || 'fallback-secret-key-change-me';

export interface JWTPayload {
    username: string;
    role: string;
    iat: number;
    exp: number;
}

export async function verifyAuth(): Promise<boolean> {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get('admin-token')?.value;

        if (!token) {
            return false;
        }

        // Verify and decode the token
        const decoded = jwt.verify(token, JWT_SECRET) as JWTPayload;

        // Check if user is admin
        return decoded.role === 'admin';
    } catch (error) {
        // Token is invalid, expired, or tampered with
        console.error('Auth verification failed:', error);
        return false;
    }
}

export async function getAuthUser(): Promise<JWTPayload | null> {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get('admin-token')?.value;

        if (!token) {
            return null;
        }

        const decoded = jwt.verify(token, JWT_SECRET) as JWTPayload;
        return decoded;
    } catch (error) {
        return null;
    }
}
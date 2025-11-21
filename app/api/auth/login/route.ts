import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// CHANGE THESE CREDENTIALS!
const ADMIN_USERNAME = 'admin';
const ADMIN_PASSWORD_HASH = "$2b$10$Q54K6j8CaTJutgmirufBdO5i7LlkcnixLYeaNYigGtjPQsDy0IpxC"; // Change 'your-secure-password'
const JWT_SECRET = process.env.JWT_SECRET || 'fallback-secret-key-change-me';

export async function POST(request: Request) {
    console.log('🔥 Login endpoint called');
    try {
        const { username, password } = await request.json();

        // Verify credentials
        if (username === ADMIN_USERNAME && bcrypt.compareSync(password, ADMIN_PASSWORD_HASH)) {

            // Create a signed JWT token with user info and expiration
            const token = jwt.sign(
                {
                    username: ADMIN_USERNAME,
                    role: 'admin',
                    iat: Math.floor(Date.now() / 1000), // issued at
                },
                JWT_SECRET,
                { expiresIn: '7d' } // Token expires in 7 days
            );
            // Create response with success
            const response = NextResponse.json({ success: true });

            // Store the JWT token in HTTP-only cookie

            response.cookies.set('admin-token', token, {
                httpOnly: true, // Can't be accessed by JavaScript
                secure: process.env.NODE_ENV === 'production', // HTTPS only in production
                sameSite: 'lax',
                maxAge: 60 * 60 * 24 * 7, // 7 days
                path: '/',
            });

            return response;
        }

        return NextResponse.json(
            { success: false, error: 'Invalid credentials' },
            { status: 401 }
        );
    } catch (error) {
        console.error('Login error:', error);
        return NextResponse.json(
            { success: false, error: 'Login failed' },
            { status: 500 }
        );
    }
}
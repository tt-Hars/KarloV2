import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const AUTH_HEADER = 'x-user-id';
const JWT_ACCESS_SECRET = process.env.JWT_ACCESS_SECRET || 'access_secret'; // Fallback for dev

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    // 1. Strip any client-provided x-user-id to prevent spoofing
    if (req.headers[AUTH_HEADER]) {
        delete req.headers[AUTH_HEADER];
    }

    // 2. Try to get token from Authorization header or Cookie
    let token = '';

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
        token = req.headers.authorization.split(' ')[1];
    } else if (req.cookies && req.cookies.accessToken) {
        token = req.cookies.accessToken;
    }

    if (token) {
        try {
            const decoded: any = jwt.verify(token, JWT_ACCESS_SECRET);
            if (decoded && decoded.userId) {
                // 3. Inject trusted user ID
                req.headers[AUTH_HEADER] = decoded.userId;
            }
        } catch (error) {
            // Token invalid or expired. We just don't set the header.
            // Downstream services can decide to 401 if they need auth.
            // console.error('Auth verification failed:', error);
        }
    }

    next();
};

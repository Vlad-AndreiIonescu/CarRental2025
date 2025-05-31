import jwt from 'jsonwebtoken';
import createError from '../utils/createError.js';

const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return next(createError('No token provided', 401));           
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, "super_secret_jwt_key");
        req.user = decoded; // Salvează datele userului în request
        next();
    } catch (error) {
        return next(createError('Invalid or expired token', 401));
    }
};

export default authMiddleware;

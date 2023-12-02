import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';
import errorResponse from '../utils/errorResponse.js';

const isAuth = (req, res, next) => {
    const authHeader = req.headers.authorization;
    console.log('authHeader', authHeader)

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(400).send({ status: false, message: "Auth failed" });
    }

    const token = authHeader.slice(7);
    console.log("token", token);

    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = { userId: payload.userId };
        next();
    } catch (err) {
        if (err.name === 'JsonWebTokenError') {
            // Token is malformed
            return res.status(401).send({ status: false, message: "Invalid token" });
        }
        next(err);
    }
};

export default isAuth;

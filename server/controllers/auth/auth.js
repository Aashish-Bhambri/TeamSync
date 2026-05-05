import JWT from 'jsonwebtoken';
import { User } from '../../models/userModel.js';

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret_here';

const authMiddleware = async (request, response, next) => {
const header = request.headers.authorization;

if (!header || !header.startsWith('Bearer')) {
return response.status(401).json({ success: false, message: 'Not authorized, token missing' });
}

const token = header.split(' ')[1];

try {
const payload = JWT.verify(token, JWT_SECRET);
const userData = await User.findById(payload.id).select('-password');

if (!userData) {
return response.status(401).json({ success: false, message: 'User not found' });
}

request.user = userData;
next();
} catch (error) {
console.log('JWT verification failed', error);
return response.status(401).json({ success: false, message: 'Token invalid or expired' });
}
};

export default authMiddleware;
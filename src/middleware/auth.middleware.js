import { verifyToken } from "../utils/jwt/verifyToken";
import { verifyGoogleToken } from "utils/auth/googleAuth";
import { verifyAppleToken } from "utils/auth/appleAuth";

export const authMiddleware = async (req, res, next) => {
    const authMethod = req.headers['x-auth-method'];
    const token = req.headers['authorization']?.split('Bearer ')[1];

    if (!token || !authMethod) {
        return res.status(401).json({ 
            message: "No authentication credentials provided"
        });
    }

    try {
        let decodedUser;

        switch (authMethod.toLowerCase()) {
            case 'credentials':
                decodedUser = verifyToken(req, process.env.JWT_SECRET);
                break;

            case 'google':
                decodedUser = await verifyGoogleToken(token);
                break;

            case 'apple':
                decodedUser = await verifyAppleToken(token);
                break;

            default:
                return res.status(401).json({ 
                    message: "Invalid authentication method"
                });
        }

        if (!decodedUser) {
            return res.status(401).json({ 
                message: "Invalid token"
            });
        }

        // Add user info to request
        req.user = decodedUser;
        req.authMethod = authMethod;
        next();

    } catch (error) {
        console.error('Auth error:', error);
        return res.status(401).json({ 
            message: "Authentication failed"
        });
    }
}; 
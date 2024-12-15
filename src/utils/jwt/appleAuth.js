// utils/auth/appleAuth.js
import jwt from 'jsonwebtoken';
import { getApplePublicKey } from 'utils/auth/appleKeys'; 

export const verifyAppleToken = async (token) => {
    try {
        const decodedToken = jwt.decode(token, { complete: true });
        const kid = decodedToken.header.kid;
        
        const publicKey = await getApplePublicKey(kid);
        const payload = jwt.verify(token, publicKey);

        return {
            id: payload.sub,
            email: payload.email,
            // other user info from Apple
        };
    } catch (error) {
        console.error('Apple token verification failed:', error);
        return null;
    }
};
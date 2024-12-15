// utils/auth/appleAuth.js
import jwt from 'jsonwebtoken';
import jwksClient from 'jwks-rsa';

// Client to fetch Apple's public keys
const client = jwksClient({
    jwksUri: 'https://appleid.apple.com/auth/keys'
});

export const verifyAppleToken = async (token) => {
    try {
        // 1. Decode the token without verification to get the key ID (kid)
        const decodedToken = jwt.decode(token, { complete: true });
        if (!decodedToken) {
            throw new Error('Invalid token format');
        }

        // 2. Get the key ID from the token header
        const kid = decodedToken.header.kid;

        // 3. Fetch Apple's public key matching this kid
        const key = await client.getSigningKey(kid);
        const publicKey = key.getPublicKey();

        // 4. Verify the token with the public key
        const payload = jwt.verify(token, publicKey, {
            algorithms: ['RS256'],
            audience: process.env.APPLE_CLIENT_ID, // Your Apple Service ID
            issuer: 'https://appleid.apple.com'
        });

        // 5. Return verified user information
        return {
            id: payload.sub,          // Apple's unique user identifier
            email: payload.email,
            emailVerified: payload.email_verified,
            // Note: Apple doesn't provide name in the token
        };

    } catch (error) {
        console.error('Apple token verification failed:', error);
        return null;
    }
};
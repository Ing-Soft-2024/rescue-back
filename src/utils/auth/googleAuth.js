import { OAuth2Client } from 'google-auth-library';

const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

export const verifyGoogleToken = async (token) => {
    try {
        // 1. Verify the token with Google's servers
        const ticket = await googleClient.verifyIdToken({
            idToken: token,
            audience: process.env.GOOGLE_CLIENT_ID // Your app's client ID
        });

        // 2. Get the user's Google profile information
        const payload = ticket.getPayload();
        
        // 3. Return verified user information
        return {
            id: payload.sub,          // Google's unique user identifier
            email: payload.email,
            firstName: payload.given_name,
            lastName: payload.family_name,
            verified: payload.email_verified,
            picture: payload.picture
        };

    } catch (error) {
        console.error('Google token verification failed:', error);
        return null;
    }
};
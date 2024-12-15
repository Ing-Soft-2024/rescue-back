import { OAuth2Client } from 'google-auth-library';
import User from "../../database/models/user.model";
import UserAuth from "../../database/models/user_auth.model";
import { createToken } from "../jwt/createToken";

const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

export const handleGoogleLogin = async (token) => {
    try {
        // 1. Verify the Google token
        const ticket = await googleClient.verifyIdToken({
            idToken: token,
            audience: process.env.GOOGLE_CLIENT_ID
        });

        const googleUser = ticket.getPayload();

        // 2. Check if user already exists
        let userAuth = await UserAuth.findOne({
            include: [{ model: User }],
            where: {
                email: googleUser.email,
                authType: 'google'
            }
        });

        if (!userAuth) {
            // 3. If new user, create user record
            const newUser = await User.create({
                firstName: googleUser.given_name,
                lastName: googleUser.family_name,
                email: googleUser.email,
                profilePicture: googleUser.picture,
                emailVerified: googleUser.email_verified,
                createdAt: new Date(),
                updatedAt: new Date()
            });

            // 4. Create auth record
            userAuth = await UserAuth.create({
                userId: newUser.id,
                email: googleUser.email,
                authType: 'google',
                authId: googleUser.sub, // Google's unique identifier
                lastLoginAt: new Date(),
                createdAt: new Date(),
                updatedAt: new Date()
            });
        } else {
            // 5. If existing user, update last login
            await userAuth.update({
                lastLoginAt: new Date()
            });
        }

        // 6. Generate JWT token
        const authResponse = await createToken({
            id: userAuth.userId,
            email: userAuth.email,
            role: 'user'
        });

        // 7. Return response with user info
        return {
            ...authResponse,
            user: {
                id: userAuth.userId,
                email: userAuth.email,
                firstName: googleUser.given_name,
                lastName: googleUser.family_name,
                profilePicture: googleUser.picture
            }
        };

    } catch (error) {
        console.error('Google authentication error:', error);
        throw new Error('Google authentication failed');
    }
};
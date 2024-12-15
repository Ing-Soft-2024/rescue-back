// controller/appleSignIn.controller.js
import jwt from 'jsonwebtoken';
import User from 'database/models/user.model';
import UserAuth from 'database/models/user_auth.model';
import { createToken } from "utils/jwt/createToken";
import { verifyAppleToken } from 'utils/jwt/appleAuth';

export const appleSignIn = async (appleToken) => {
    try {
        // 1. Verify the Apple token
        const appleUser = await verifyAppleToken(appleToken);
        if (!appleUser) {
            throw new Error('Invalid Apple token');
        }

        // 2. Find or create user in database
        let userAuth = await UserAuth.findOne({
            include: [{ model: User }],
            where: {
                email: appleUser.email,
                authType: 'apple'
            }
        });

        if (!userAuth) {
            // 3. Create new user if doesn't exist
            const newUser = await User.create({
                email: appleUser.email,
                // Note: Apple only provides name on first sign-in
                firstName: appleUser.firstName || '',
                lastName: appleUser.lastName || '',
                emailVerified: appleUser.emailVerified,
                createdAt: new Date(),
                updatedAt: new Date()
            });

            // 4. Create auth record
            userAuth = await UserAuth.create({
                userId: newUser.id,
                email: appleUser.email,
                authType: 'apple',
                authId: appleUser.id, // Apple's unique identifier
                lastLoginAt: new Date(),
                createdAt: new Date(),
                updatedAt: new Date()
            });
        } else {
            // 5. Update last login time
            await userAuth.update({
                lastLoginAt: new Date()
            });
        }

        // 6. Generate our JWT token
        const authResponse = await createToken({
            id: userAuth.userId,
            email: userAuth.email,
            role: 'user'
        });

        // 7. Return user info and token
        return {
            ...authResponse,
            user: {
                id: userAuth.userId,
                email: userAuth.email,
                firstName: userAuth.User.firstName,
                lastName: userAuth.User.lastName
            }
        };

    } catch (error) {
        console.error('Apple Sign In error:', error);
        throw new Error('Apple authentication failed');
    }
};
// utils/auth/credentialsAuth.js
import bcrypt from 'bcrypt';
import User from "../../database/models/user.model";
import UserAuth from "../../database/models/user_auth.model";
import { createToken } from "../jwt/createToken";

export const handleCredentialsLogin = async (credentials) => {
    try {
        // 1. Check if user already exists
        let userAuth = await UserAuth.findOne({
            include: [{ model: User }],
            where: {
                email: credentials.email,
                authType: 'credentials'
            }
        });

        if (!userAuth) {
            throw new Error('User not found');
            
        } else {
            // 4. If user exists, verify password
            const validPassword = await bcrypt.compare(
                credentials.password, 
                userAuth.passwordHash
            );

            if (!validPassword) {
                throw new Error('Invalid credentials');
            }

            // 5. Update last login
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
                firstName: credentials.firstName,
                lastName: credentials.lastName
            }
        };

    } catch (error) {
        console.error('Credentials authentication error:', error);
        throw new Error(error.message || 'Authentication failed');
    }
};
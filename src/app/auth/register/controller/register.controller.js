

import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { User } from '../../../../database/models/user.model';
import { UserAuth } from '../../../../database/models/user_auth.model';


export const register = async (data) => {
    console.log("------REGISTER CONTROLLER: REGISTER------")
    const JWT_SECRET = process.env.JWT_SECRET || 'secret';
    try {

        const normalizedEmail = data.email.toLowerCase().trim();

        // Check if user already exists
        const existingUser = await User.findOne({ 
            where: { 
                email: normalizedEmail 
            }
        });

        if (existingUser) {
            throw new Error('User already exists');
        }

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(data.password, salt);

        // Create new user
        const user = await User.create({
            email: normalizedEmail,
            firstName: data.firstName,
            lastName: data.lastName,
            address: data.address,
            city: data.city,
            country: data.country
        });
        const userAuth = await UserAuth.create({
            userId: user.id,
            email: normalizedEmail,
            passwordHash: hashedPassword,
            authType: 'local',
            authId: 'local',
        
        });

        // Generate JWT token
        const token = jwt.sign(
            { 
                userId: user.id,
                email: user.email, 
                // firstName: user.firstName,
                // lastName: user.lastName,
                // address: user.address,
                // city: user.city,
                // country: user.country
            },
            JWT_SECRET,
            { expiresIn: '24h' }
        );

        // Return user data and token (excluding password)
        return {
            token,
            user: {
                id: user.id,
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
                address: user.address,
                city: user.city,
                country: user.country
            }
        };

    } catch (error) {
        throw new Error(error.message);
    }
};
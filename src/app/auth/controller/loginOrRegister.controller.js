import User from "database/models/user.model";
import UserAuth from "database/models/user_auth.model";
import { createToken } from "utils/jwt/createToken";
import bcrypt from "bcrypt";

class AuthError extends Error {
    constructor(message) {
        super(message);
        this.name = "AuthError";
    }
}

const login = async (data) => {
    const userAuth = await UserAuth.findOne({
        include: [{ model: User }],
        where: {
            email: data.email,
            authType: "credentials"
        }
    });

    if (!userAuth) {
        throw new AuthError("Invalid credentials");
    }

    const validPassword = await bcrypt.compare(data.password, userAuth.passwordHash);
    if (!validPassword) {
        throw new AuthError("Invalid credentials");
    }

    return await createToken(userAuth);
}

const register = async (data) => {
    // Check if user already exists
    const existingUser = await UserAuth.findOne({
        where: {
            email: data.email,
            authType: "credentials"
        }
    });

    if (existingUser) {
        throw new AuthError("User already exists");
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(data.password, salt);

    const userData = await User.create({
        firstName: data.firstName,
        lastName: data.lastName,
        dateOfBirth: data.dateOfBirth,
        phoneNumber: data.phoneNumber,
        address: data.address,
        city: data.city,
        state: data.state,
        country: data.country,
    });

    const userAuth = await UserAuth.create({
        userId: userData.id,
        email: data.email,
        passwordHash: hashedPassword,
        authType: "credentials"
    });

    return await createToken(userAuth);
}

export const loginOrRegister = async (data) => {
    try {
        return await login(data);
    } catch (err) {
        if (err instanceof AuthError && err.message === "Invalid credentials") {
            return await register(data);
        }
        throw err;
    }
}
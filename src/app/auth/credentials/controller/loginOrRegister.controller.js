import User from "database/models/user.model";
import UserAuth from "database/models/user_auth.model";
import { createToken } from "utils/jwt/createToken";

class CredentialsError extends Error {
    constructor(message) {
        super(message);
        this.name = "CredentialsError";
    }
}

class DBError extends Error {
    constructor(message) {
        super(message);
        this.name = "DBError";
    }
}

const login = async () => {
    const user = await UserAuth.findOne({
        include: [{ model: User, }],
        where: {
            "email": data.email,
            "passwordHash": data.password,
            "authType": "credentials",
        }
    }).catch((err) => {
        console.error(err);
        throw new DBError("Error al obtener el usuario");
    });
    if (!user) throw new CredentialsError("No se encontró el usuario");

    return await createToken(user);
}

const register = async () => {
    const userData = await User.create({
        "firstName": data.firstName,
        "lastName": data.lastName,
        "dateOfBirth": data.dateOfBirth,
        "phoneNumber": data.phoneNumber,
        "address": data.address,
        "city": data.city,
        "state": data.state,
        "country": data.country,
    }).catch((err) => {
        console.error(err);
        throw new DBError("Error al registrar el usuario");
    });

    const user = await UserAuth.create({
        "userId": userData.id,
        "email": data.email,
        "passwordHash": data.password,
        "authType": "credentials",
        "authId": data.authId,
    }).catch((err) => {
        console.error(err);
        throw new DBError("Error al registrar el usuario");
    });
    if (!user) throw new CredentialsError("No se encontró el usuario");

    return await createToken(user);
}

export const loginOrRegister = async (data) => {
    try {
        return await login(data);
    } catch (err) {
        if (err instanceof CredentialsError) return await register(data);
        throw CredentialsError("Error al iniciar sesión");
    }
}
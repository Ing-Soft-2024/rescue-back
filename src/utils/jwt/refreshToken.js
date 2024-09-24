import jwt from "jsonwebtoken";

export const refreshToken = async (token) => {
    const decoded = await jwt.verify(token, process.env.JWT_SECRET);
    return decoded;
}
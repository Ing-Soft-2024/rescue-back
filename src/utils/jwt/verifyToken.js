import jwt from 'jsonwebtoken';

/**
 * Verifies the token from the request headers
 * @param {Request} req 
 * @param {String} secret
 * @returns 
 */
export const verifyToken = (req, secret) => {
    const headers = req.headers;
    if (!headers) return false;

    const token = headers['authorization'];
    if (!token) return false;

    const regex = /^Bearer\s(?<token>[\w-]*\.[\w-]*\.[\w-]*$)$/;
    if (!regex.test(token)) return false;

    const jwtToken = token.match(regex).groups.token;
    if (!jwtToken) return false;

    try {
        const decoded = jwt.verify(jwtToken, secret);
        return decoded;
    } catch (error) {
        console.error('Error verifying token: ', error);
        return false;
    }
}
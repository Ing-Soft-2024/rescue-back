import jwt from 'jsonwebtoken';

export const createToken = async (user) => {
    if (!user) return null;

    const token = jwt.sign({
        user: {
            id: user.id,
            email: user.email,
            role: user.role || 'user'
        }
    }, process.env.JWT_SECRET, {
        expiresIn: '24h'
    });

    return {
        token,
        user: {
            id: user.id,
            email: user.email
        }
    };
}
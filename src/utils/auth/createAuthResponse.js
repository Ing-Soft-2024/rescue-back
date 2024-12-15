import { createToken } from '../jwt/createToken';

export const createAuthResponse = async (user, authMethod) => {
    const token = await createToken(user);
    
    return {
        idToken: token,
        user: {
            id: user.id,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName
        },
        method: authMethod,
        expiresIn: '24h'
    };
};

// src/app/auth/credentials/controller/googleSignIn.controller.js
import { handleGoogleLogin } from '../../../utils/jwt/googleAuth';

export const googleSignIn = async (token) => {
    return await handleGoogleLogin(token);
};
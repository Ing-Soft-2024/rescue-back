
import { loginOrRegister } from "./loginOrRegister.controller";
import { googleSignIn } from "./googleSignIn.controller";
import { appleSignIn } from "./appleSignIn.controller";


export const login = async (data) => {
    console.log("login ENDPOINT");
    const { method, credentials } = data;

    try {
        let authResult;

        switch (method) {
            case 'credentials':
                authResult = await loginOrRegister(credentials);
                break;

            case 'google':
                authResult = await googleSignIn(credentials.token);
                break;

            case 'apple':
                authResult = await appleSignIn(credentials.token);
                break;

            default:
                throw new Error('Invalid authentication method');
        }

        authResult.method = method;
        
        return authResult;

        } catch (error) {
        throw new Error(error.message);
        }
    }

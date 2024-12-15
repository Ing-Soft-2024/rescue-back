//import { ApiPath, Post } from "swagger-express-decorators";
//import { ApiPath, Post } from "swagger-express-ts";

import { ApiOperationPost, ApiPath } from "swagger-express-decorators";
import { responseFormula } from "utils/response.util";
import { login } from "./controller/login.controller";



@ApiPath({
    name: "Auth",
    path: "/auth",
    description: "Module to manage Authentication.",
})
export default class AuthController {

    @ApiOperationPost({
        description: "Login or register",
        summary: "Login or register",
        parameters: {
            body: {
                description: "User credentials",
                required: true,
                model: "UserAuth",
                // model: "user_auth"
            },
        },
        responses: {
            200: "Success",
        }
    })
    POST = (req, res) => responseFormula(res, login(req.body));
}

// @ApiPath({
//     name: "Auth",
//     path: "/auth",
// })
// export default class AuthController {
//     @Post("/login")
//     async login(req, res) {
//         console.log("login ENDPOINT");
//         const { method, credentials } = req.body;

//         try {
//             let authResult;

//             switch (method) {
//                 case 'credentials':
//                     authResult = await this.handleCredentialsLogin(credentials);
//                     break;

//                 case 'google':
//                     authResult = await this.handleGoogleLogin(credentials.token);
//                     break;

//                 case 'apple':
//                     authResult = await this.handleAppleLogin(credentials.token);
//                     break;

//                 default:
//                     throw new Error('Invalid authentication method');
//             }

//             authResult.method = method;

//             res.json({
//                 success: true,
//                 data: authResult
//             });

//         } catch (error) {
//             res.status(401).json({
//                 success: false,
//                 message: error.message
//             });
//         }
//     }

//     async handleCredentialsLogin(credentials) {
//         return await loginOrRegister(credentials);
//     }

//     async handleGoogleLogin(token) {
//         return await googleSignIn(token);
//     }

//     async handleAppleLogin(token) {
//         return await appleSignIn(token);
//     }
// }

// module.exports = AuthController;
import { ApiOperationPost, ApiPath } from "swagger-express-decorators";
import { responseFormula } from "utils/response.util";

import { login } from "./controller/login.controller";

@ApiPath({
    name: "Auth",
    path: "/auth/login",
    description: "Module to manage login.",
})
export default class LoginController {

    @ApiOperationPost({
        description: "Login",
        summary: "Login",
        parameters: {
            body: {
                description: "Login Credentials object",
                required: true,
                model: "LoginCredentials",
            },
        },
        responses: {
            200: "Success",
        },
        401: {
            description: "Invalid credentials"
        }
    })
    POST = (req, res) => responseFormula(res, login(req.body));
}
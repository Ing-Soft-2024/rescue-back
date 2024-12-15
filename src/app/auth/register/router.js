// src/app/auth/register/router.js
import { ApiOperationPost, ApiPath } from "swagger-express-decorators";
import { responseFormula } from "utils/response.util";
import { register } from "./controller/register.controller";

@ApiPath({
    name: "Auth",
    path: "/auth/register",
    description: "Authentication module for registration.",
})
export default class RegisterController {
    @ApiOperationPost({
        description: "Register new user",
        summary: "User registration",
        parameters: {
            body: {
                description: "Registration data",
                required: true,
                model: "RegisterCredentials",
            }
        },
        responses: {
            200: {
                description: "Success",
            },
            400: {
                description: "Bad request"
            }
        }
    })
    POST = (req, res) => responseFormula(res, register(req.body));
}
import { ApiOperationPost, ApiPath } from "swagger-express-ts";
import { responseFormula } from "utils/response.util";

@ApiPath({
    name: "Credentials",
    path: "/auth/credentials",
    description: "Module to manage credentials.",
})
export default class CredentialsController {

    @ApiOperationPost({
        description: "Login",
        summary: "Login",
        parameters: {
            body: {
                description: "Credentials object",
                required: true,
                model: "Credentials",
            },
        },
        responses: {
            200: "Success",
        }
    })
    POST = (req, res) => responseFormula(res, login(req.body));
}
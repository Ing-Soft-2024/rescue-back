import { ApiOperationGet, ApiPath } from "swagger-express-ts";
import { responseFormula } from "utils/response.util";
import { hasBusiness } from "./controller/has.business";

@ApiPath({
    name: "UserBusiness",
    path: "/user/business",
    description: "Module to manage user business.",
})
export default class UserBusinessController {
 
    // GET
    @ApiOperationGet({
        description: "Get user business",
        summary: "Get user business",
        responses: {
            200: "Success",
        },
    })
    GET = (req, res) => responseFormula(res, hasBusiness(req.query));
}
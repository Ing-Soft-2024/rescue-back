import { ApiOperationGet, ApiOperationPost, ApiPath } from "swagger-express-decorators";
import { responseFormula } from "utils/response.util";
import { addCommerce } from "./controller/commerce.add";
import { getCommerces } from "./controller/commerces.get";

@ApiPath({
    name: "Commerces",
    path: "/commerce",
    description: "Module to manage commerces.",
})
export default class CommercesController {

    @ApiOperationGet({
        description: "Get list of commerces",
        summary: "Get list of commerces",
        responses: {
            200: "Success",
        },
    })
    GET = (req, res) => responseFormula(res, getCommerces());

    @ApiOperationPost({
        description: "Add a commerce",
        summary: "Add a commerce",
        parameters: {
            body: {
                description: "Commerce object",
                required: true,
                model: "Business",
            },
        },
        responses: {
            200: "Success",
        }
    })
    POST = (req, res) => responseFormula(res, addCommerce(req.body));
}
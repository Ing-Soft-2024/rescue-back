import { ApiOperationGet, ApiPath } from "swagger-express-decorators";
import { responseFormula } from "utils/response.util";
import { getCommerceById } from "./controller/commerce.get";

@ApiPath({
    name: "CommerceDetails",
    path: "/commerce/{id}",
    description: "Module to manage commerce details.",
})
export default class CommerceDetailsController {

    @ApiOperationGet({
        description: "Get commerce by id",
        parameters: {
            path: {
                id: {
                    type: 'integer',
                    description: "Id of the commerce",
                    required: true,
                }
            }
        },
        summary: "Get commerce by id",
        responses: {
            200: {
                description: "Success",
                model: "Business",
            }
        },
    })
    GET = (req, res) => responseFormula(res, getCommerceById(req.params.id));
}
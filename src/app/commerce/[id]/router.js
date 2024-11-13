import { ApiOperationGet, ApiOperationPatch, ApiPath } from "swagger-express-decorators";
import { responseFormula } from "utils/response.util";
import { getCommerceById } from "./controller/commerce.get";
import { updateCommerceRating } from "./controller/commerce.rating.update";

import { type } from "os";

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

    @ApiOperationPatch({
        description: "Update commerce rating",
        parameters: {
            path: {
                id: {
                    type: 'integer',
                    description: "Id of the commerce",
                    required: true,
                }
            },
            body: {
                type: 'string',
                description: "Rating",
                required: true,
            },
        },
        summary: "Update commerce rating",
        responses: {
            200: {
                description: "Success",
                model: "Business",
            }
        },
    })
    PATCH = (req, res) => responseFormula(res, updateCommerceRating(req.params.id, req.body));
}
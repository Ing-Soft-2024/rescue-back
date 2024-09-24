import { ApiOperationGet, ApiPath } from "swagger-express-ts";
import { responseFormula } from "utils/response.util";
import { getCategoryById } from "./controller/category.get";

@ApiPath({
    name: "CategoryDetails",
    path: "/category/{id}",
    description: "Module to manage category details.",
})
export default class CategoryDetailsController {

    @ApiOperationGet({
        description: "Get category by id",
        parameters: {
            path: {
                id: {
                    type: 'integer',
                    description: "Id of the category",
                    required: true,
                }
            }
        },
        summary: "Get category by id",
        responses: {
            200: "Success",
        },
    })
    GET = (req, res) => responseFormula(res, getCategoryById(req.params.id))
}
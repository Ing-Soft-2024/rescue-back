import { ApiOperationGet, ApiPath } from "swagger-express-decorators";
import { responseFormula } from "utils/response.util";
import { getCategories } from "./controller/categories.get";

@ApiPath({
    name: "Categories",
    path: "/categories",
    description: "Module to manage categories.",
})
export default class CategoryController {

    @ApiOperationGet({
        description: "Get list of categories",
        summary: "Get list of categories",
        responses: {
            200: {
                description: "Success",
                model: "Category",
                isArray: true,
                example: [{
                    "name": "Category name",
                    "description": "Category description",
                }]
            }
        },
    })
    GET = (req, res) => responseFormula(res, getCategories());
}
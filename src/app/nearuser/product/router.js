import { ApiOperationGet, ApiPath } from "swagger-express-ts";
import { responseFormula } from "utils/response.util";
import { getNearProducts } from "./controller/near.products.get";


@ApiPath({
    name: "NearProducts",
    path: "/nearuser/product",
    description: "Module to manage products.",
})
export default class NearProductsController {

    @ApiOperationGet({
        description: "Get list of products",
        summary: "Get list of products",
        parameters: {
            query: {
                "categoryId": {
                    type: 'integer',
                    description: "Id of the category",
                    required: false,
                },
                "search": {
                    type: 'string',
                    description: "Search term",
                    required: false,
                },
                "userLatitude": {
                    type: 'number',
                    description: "Latitude of the user",
                    required: true,
                },
                "userLongitude": {
                    type: 'number',
                    description: "Longitude of the user",
                    required: true,
                }
            }
        },
        responses: {
            200: "Success",
        },
    })
    GET = (req, res) => responseFormula(
        res,
        getNearProducts(
            req.query.categoryId, 
            req.query.userLongitude,   // Now passing longitude first
            req.query.userLatitude,    // Now passing latitude second
            req.query.search
        )
    );


   
}
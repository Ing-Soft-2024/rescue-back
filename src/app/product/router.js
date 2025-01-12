import { ApiOperationGet, ApiOperationPost, ApiPath } from "swagger-express-ts";
import { responseFormula } from "utils/response.util";
import { addProduct } from "./controller/products.add";
import { getListOfProducts } from "./controller/products.get";

@ApiPath({
    name: "Products",
    path: "/product",
    description: "Module to manage products.",
})
export default class ProductsController {

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
                "commerceId": {
                    type: 'integer',
                    description: "Id of the commerce",
                    required: false,
                }
            }
        },
        responses: {
            200: "Success",
        },
    })
    GET = (req, res) => responseFormula(
        res,
        getListOfProducts(req.query.categoryId, req.query.commerceId)
    );


    @ApiOperationPost({
        description: "Add a product",
        summary: "Add a product",
        parameters: {
            body: {
                description: "Product object",
                required: true,
                model: "Product",
                properties: {
                    name: { type: "string", required: true },
                    description: { type: "string", required: true },
                    price: { type: "number", required: true },
                    businessId: { type: "integer", required: true },
                    stock: { type: "integer", required: true },
                    image: { type: "string", required: true },
                    categories: { 
                        type: "array", 
                        required: true,
                        items: {
                            type: "integer"
                        }
                    }
                }
            },
        },
        responses: {
            200: "Success",
            400: "Bad Request - Missing required fields",
            500: "Internal Server Error"
        }
    })
    POST = (req, res) => responseFormula(res, addProduct(req.body));
}
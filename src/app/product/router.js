import { ApiOperationGet, ApiOperationPost, ApiPath } from "swagger-express-ts";
import { responseFormula } from "utils/response.util";
import { addProduct } from "./controller/products.add";
import { getListOfProducts } from "./controller/products.get";

@ApiPath({
    name: "Products",
    path: "/products",
    description: "Module to manage products.",
})
export default class ProductController {

    @ApiOperationGet({
        description: "Get list of products",
        summary: "Get list of products",
        responses: {
            200: "Success",
        },
    })
    GET = (req, res) => responseFormula(res, getListOfProducts());


    @ApiOperationPost({
        description: "Add a product",
        summary: "Add a product",
        parameters: {
            body: {
                description: "Product object",
                required: true,
                model: "Product",
            },
        },
        responses: {
            200: "Success",
        }
    })
    POST = (req, res) => responseFormula(res, addProduct(req.body));
}
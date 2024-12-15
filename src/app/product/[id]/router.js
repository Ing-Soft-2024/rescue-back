import { ApiOperationDelete, ApiOperationGet, ApiOperationPost, ApiPath } from "swagger-express-ts";
import { responseFormula } from "utils/response.util";
import { deleteProduct } from "./controller/product.delete";
import { editProduct } from "./controller/product.edit";
import { getProductById } from "./controller/product.get";

@ApiPath({
    name: "ProductDetails",
    path: "/product/{id}",
    description: "Module to manage product details.",
})
export default class ProductDetailsController {

    @ApiOperationGet({
        description: "Get product by id",
        parameters: {
            path: {
                id: {
                    type: 'integer',
                    description: "Id of the product",
                    required: true,
                }
            }
        },
        summary: "Get product by id",
        responses: {
            200: {
                description: "Success",
                model: "Product",
            }
        },
    })
    GET = (req, res) => responseFormula(res, getProductById(req.params.id));

    @ApiOperationPost({
        description: "Edit a product",
        summary: "Edit a product",
        parameters: {
            path: {
                id: {
                    type: 'integer',
                    description: "Id of the product",
                    required: true,
                }
            },
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
    POST = (req, res) => responseFormula(res, editProduct(req.params.id, req.body));

    @ApiOperationDelete({
        description: "Delete a product",
        summary: "Delete a product",
        parameters: {
            path: {
                id: {
                    type: 'integer',
                    description: "Id of the product",
                    required: true,
                }
            }
        },
        responses: {
            200: "Success",
        }
    })
    DELETE = (req, res) => responseFormula(res, deleteProduct(req.params.id));

}
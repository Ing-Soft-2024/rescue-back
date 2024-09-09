import { ApiPath } from "swagger-express-ts";
import { responseFormula } from "utils/response.util";
import { editProduct } from "./controller/product.edit";
import { getProductById } from "./controller/product.get";

@ApiPath({
    name: "ProductDetails",
    path: "/product/:id",
    description: "Module to manage product details.",
})
export default class ProductDetailsController {

    GET = (req, res) => responseFormula(res, getProductById(req.params.id));

    POST = (req, res) => responseFormula(res, editProduct(req.params.id, req.params.body));
}
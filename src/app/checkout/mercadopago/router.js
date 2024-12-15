



import { ApiOperationPost, ApiPath } from "swagger-express-ts";
import { responseFormula } from "utils/response.util";
import { createPreference } from "./controller/mercadoPago";

@ApiPath({
    name: "CheckoutPro",
    path: "/checkout/mercadopago",
    description: "Module to manage Mercado Pago checkout.",
})
export default class CheckoutController {
    @ApiOperationPost({
        description: "CheckoutPro example",
        summary: "CheckoutPro example",
        parameters: {
            body: {
                description: "Order Item Object",
                required: true,
                model: "OrderItem",
            },
        },
        responses: {
            200: "Success",
        },
    })
    POST = (req, res) => responseFormula(res, createPreference(req.body));
}
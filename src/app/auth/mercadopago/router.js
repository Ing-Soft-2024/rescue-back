import { ApiOperationPost } from "swagger-express-ts";
import { Authorization } from "utils/jwt/authorization.decorator";
import { responseFormula } from "utils/response.util";
import { authenticateOnMercadoPago } from "./controller/auth";

export default class MercadoPagoController {
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
    @Authorization()
    POST = (req, res) => responseFormula(res, authenticateOnMercadoPago(
        req.session,
        req.body    
    ));
}
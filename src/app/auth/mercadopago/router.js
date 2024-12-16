import { ApiOperationGet, ApiOperationPost, ApiPath } from "swagger-express-ts";
import { responseFormula } from "utils/response.util";
import { authenticateOnMercadoPago } from "./controller/auth";


@ApiPath({
    name: "MercadoPago",
    path: "/auth/mercadopago",
    description: "Module to manage Mercado Pago authentication.",
})
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
    POST = (req, res) => responseFormula(res, authenticateOnMercadoPago(
        req.body    
    ));


    @ApiOperationGet({
        description: "CheckoutPro example",
        summary: "CheckoutPro example",
        responses: {
            200: "Success",
        },
    })
    GET = (req, res) => {
        const { code, state } = req.query;
        res.redirect(`rescueappbussiness://create_commerce?code=${code}&state=${state}`);
    }
}
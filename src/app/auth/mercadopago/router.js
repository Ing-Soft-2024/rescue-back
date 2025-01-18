import { ApiOperationGet, ApiOperationPost, ApiPath } from "swagger-express-ts";
import { responseFormula } from "utils/response.util";
import { authenticateOnMercadoPago } from "./controller/auth";
import { Business } from "../database/models/business.model";


@ApiPath({
    name: "MercadoPago",
    path: "/auth/mercadopago",
    description: "Module to manage Mercado Pago authentication.",
})
export default class MercadoPagoController {
    @ApiOperationPost({
        description: "Authenticate with MercadoPago",
        summary: "Authenticate with MercadoPago",
        parameters: {
            body: {
                description: "OAuth credentials",
                required: true,
                properties: {
                    client_id: {
                        type: "string",
                        required: true
                    },
                    client_secret: {
                        type: "string",
                        required: true
                    },
                    code: {
                        type: "string",
                        required: true
                    },
                    redirect_uri: {
                        type: "string",
                        required: true
                    },
                    commerceId: {
                        type: "integer",
                        required: true
                    }
                }
            },
        },
        responses: {
            200: "Success",
            400: "Bad Request",
            500: "Internal Server Error"
        },
    })
    POST = (req, res) => responseFormula(res, authenticateOnMercadoPago(req.body));


    @ApiOperationGet({
        description: "MercadoPago OAuth Callback",
        summary: "MercadoPago OAuth Callback",
        parameters: {
            query: {
                code: {
                    type: "string",
                    required: true
                },
                state: {
                    type: "string",
                    required: true
                }
            }
        },
        responses: {
            200: "Success",
        },
    })
    GET = async (req, res) => {
        const { code, state: commerceId } = req.query;
        
        try {
            const result = await authenticateOnMercadoPago({
                client_secret: process.env.MERCADO_PAGO_CLIENT_SECRET,
                client_id: process.env.MERCADO_PAGO_CLIENT_ID,
                code,
                redirect_uri: process.env.MERCADO_PAGO_REDIRECT_URI,
                commerceId
            });

            // Update business to indicate MercadoPago is connected
            await Business.update(
                { hasMercadoPago: true },
                { where: { id: commerceId } }
            );

            return res.redirect(`rescueapp-bussiness://MercadoPagoSuccessScreen`);
        } catch (error) {
            console.error('MP Auth Error:', error);
            return res.redirect(`rescueapp-bussiness://MercadoPagoErrorScreen?error=${encodeURIComponent(error.message)}`);
        }
    }
}
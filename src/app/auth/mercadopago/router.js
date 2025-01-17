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
            // Detailed logging of the incoming request
            console.log('MP Auth Callback - Full Details:', { 
                code,
                commerceId,
                fullQuery: req.query,
                url: req.url,
                headers: req.headers
            });
            
            // Log the exact parameters we're passing to authenticateOnMercadoPago
            const authParams = {
                client_secret: "wt9PNaBNkA10IYFlgbP7Kdl7Kf48IDen",
                client_id: "2381168209109958",
                code,
                redirect_uri: "https://varied-laurella-rescue-bafbd5dd.koyeb.app/api/auth/mercadopago",
                commerceId
            };
            
            console.log('MP Auth - Passing Parameters:', authParams);

            const result = await authenticateOnMercadoPago(authParams);

            // Log successful authentication
            console.log('MP Auth Success:', result);

            // Make sure to end the response after redirect
            return res.redirect(`rescueapp-bussiness://MercadoPagoSuccessScreen`);
        } catch (error) {
            // Log the full error object
            console.error('MP Auth Full Error:', {
                message: error.message,
                status: error.status,
                cause: error.cause,
                stack: error.stack
            });

            
            const errorParams = new URLSearchParams({
                error: 'mp_auth_error',
                rawError: encodeURIComponent(JSON.stringify({
                    client_secret: "wt9PNaBNkA10IYFlgbP7Kdl7Kf48IDen",
                client_id: "2381168209109958",
                code,
                redirect_uri: "https://varied-laurella-rescue-bafbd5dd.koyeb.app/api/auth/mercadopago",
                commerceId,
                    fullQuery: req.query,
                    url: req.url,
                    message: error.message,
                    status: error.status,
                    cause: error.cause,
                    errorResponse: error.response?.data?.message || error.response?.data
                }))
            }).toString();

            return res.redirect(`rescueapp-bussiness://MercadoPagoErrorScreen?${errorParams}`);
        }
    }
}
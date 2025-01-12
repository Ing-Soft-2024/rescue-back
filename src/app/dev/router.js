import { ApiOperationGet, ApiPath } from "swagger-express-ts";
import { responseFormula } from "utils/response.util";
import { getEnviromentVariables } from "./controller/dev";

@ApiPath({
    name: "Dev",
    path: "/dev",
    description: "Module to manage dev.",
})
export default class DevController {

    @ApiOperationGet({
        description: "Get enviroment variables",
        summary: "Get enviroment variables",
        responses: {
            200: {
                description: "Success",
                isArray: false,
                example: {
                    "NODE_ENV": "development",
                    "PORT": "3000",
                    "DB_HOST": "localhost",
                    "DB_PORT": "5432",
                    "DB_USER": "postgres",
                    "DB_PASSWORD": "postgres",
                    "DB_NAME": "postgres",
                    "MERCADO_PAGO_KEY": "APP_USR-6344444444444444-01234567890-4444444444444444",
                    "MERCADO_PAGO_TOKEN": "APP_USR-6344444444444444-01234567890-4444444444444444",
                    "MERCADO_PAGO_CLIENT_ID": "6344444444444444",
                    "MERCADO_PAGO_CLIENT_SECRET": "4444444444444444",
                    "MERCADO_PAGO_CALLBACK_URL": "http://localhost:3000/api/v1/mercadopago/callback",
                    "MERCADO_PAGO_ACCESS_TOKEN": "APP_USR-23234224",
                    "MERCADO_PAGO_CLIENT": "23234224",
                    "MERCADO_PAGO_SECRET": "wSSaasdasdasdasdasd",
                    "LOCATIONIQ_API_KEY": "pk.5d2d9c33238099e21940a84318f53b66",
                    "MERCADO_PAGO_APPLICATION_TOKEN": "APP_USR-45456464646464538c598a5",
                    "MERCADO_PAGO_REDIRECT_URI": "https://varied-laurella-rescue-bafbd5dd.koyeb.app/api/auth/mercadopago",
                    "MARKETPLACE_FEE_PERCENTAGE": "5"
                }
            }
        },
    })
    GET = (req, res) => responseFormula(res, getEnviromentVariables());
}
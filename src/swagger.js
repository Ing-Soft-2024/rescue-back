import express from "express";
import * as swagger from "swagger-express-ts";
import SwaggerUI from "swagger-ui-express";

const createApplicaton = () => {
    const app = express();

    app.useSwagger = ({
        swaggerDoc = "/docs",
        schemeURL = "/swagger.json"
    }) => {
        app.use(
            swagger.express({
                path: schemeURL,
                "definition": {
                    "info": {
                        'title': 'REST API RESCUE',
                        'description': "Documentación completa de la nueva REST API para contactarse con el back de RescueApp.",
                        'version': '1.0',
                    },
                    'basePath': '/api',
                    'host': process.env.API_URL,
                    'schemes': ['http'],
                    'securityDefinitions': {
                        'Bearer': {
                            'type': 'apiKey',
                            'name': 'Authorization',
                            'in': 'header'
                        }
                    },
                    'security': [{ 'Bearer': [] }],
                    'responses': {
                        '200': 'Success',
                        '400': {
                            'model': 'ErrorModel'
                        },
                        '500': {
                            'model': 'ErrorModel'
                        }
                    }
                }
            }));

        console.log(`Swagger documentation available at http://localhost:${process.env.PORT}${swaggerDoc}`);
        return app.use(
            swaggerDoc,
            SwaggerUI.serve,
            SwaggerUI.setup(
                null,
                null,
                null,
                null,
                null,
                schemeURL
            )
        );
    }

    return app;
}
export default createApplicaton;
import express from "express";
import * as swagger from "swagger-express-ts";
import SwaggerUI from "swagger-ui-express";

const createApplicaton = () => {
    const app = express();

    app.useSwagger = ({
        info = {
            title: "Swagger Express",
            description: "This is a sample server for Swagger Express",
            version: "1.0"
        },
        swaggerDoc = "/docs",
        schemeURL = "/swagger.json"
    }) => {
        app.use(
            swagger.express({
                path: schemeURL,
                "definition": { "info": info, }
            }));

        console.log(`Swagger documentations available at http://localhost:${process.env.PORT}${swaggerDoc}`);
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
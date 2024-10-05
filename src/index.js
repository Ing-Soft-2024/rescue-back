import cors from "cors";
import { initDatabase } from "database/index.js";
import Category from "database/models/category.model.js";
import dotenv from "dotenv";
import express from "express";
import { swaggerJSON } from "swagger-express-decorators/express.configurator.js";
import swaggerUI from "swagger-ui-express";
import readRouter from "./read.router.js";
import swagger from "./swagger.js";

dotenv.config();
const app = swagger();
app.use(cors());
app.use(express.json({
    limit: '50mb'
}));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(express.static('public'));

/**
 * @type {Object[]} 
 * @property {string} name
 * @property {string} descripcion
 */
const categories = [
    { "name": 'Comida', "description": 'Comida' },
    { "name": 'Bebida', "description": 'Bebida' },
    { "name": 'Vegetariano', "description": 'Vegetales' },
    { "name": 'Café', "description": 'Café' },
]

initDatabase().then(() => {
    categories.forEach(async category => await Category.create(category))
}).then(() => {
    readRouter(app, {
        baseAPI: 'api',
        basePath: process.env.PRODUCTION ? 'dist/app' : 'src/app'
    })
        .then(() => {
            /**
             * If needs some other configuration, you can add them here with app.
             */

            // DETERMINE WHETHER TO USE SWAGGER
            app.get('/swagger.json', (req, res) => {
                res.json(swaggerJSON({
                    "info": {
                        "title": "REST API RESCUE",
                        "description": "Documentación completa de la nueva REST API para contactarse con el back de RescueApp.",
                        "version": "1.0",
                    },
                    "basePath": "/api",
                    "host": process.env.API_URL,
                    "schemes": ["http"],
                    "securityDefinitions": {
                        "Bearer": {
                            "type": "apiKey",
                            "name": "Authorization",
                            "in": "header"
                        }
                    },
                    "responses": {
                        "200": "Success",
                        "400": {
                            "model": "ErrorModel"
                        },
                        "500": {
                            "model": "ErrorModel"
                        }
                    }
                }));
            });

            app.use('/docs', swaggerUI.serve, swaggerUI.setup(null, null, null, null, null, '/swagger.json'));

            // app.useSwagger({
            //     "swaggerDoc": "/docs",
            //     "schemeURL": "/swagger.json"
            // });

            app.listen(process.env.PORT, (err) => {
                if (err) return console.error(err);
                console.log(`Server running at http://localhost:${process.env.PORT}/`);
            });
        });
})
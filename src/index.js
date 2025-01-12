import cors from "cors";
import { initDatabase } from "database/index.js";
import Category from "database/models/category.model.js";
import dotenv from "dotenv";
import express from "express";
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
    { "name": 'Ropa', "description": 'Ropa' },
    { "name": 'Hogar', "description": 'Hogar' },
    { "name": 'Juguetes', "description": 'Juguetes' },
    { "name": 'Deportes', "description": 'Deportes' },
    { "name": 'Libros', "description": 'Libros' },
    { "name": 'Herramientas', "description": 'Herramientas' },
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
            app.useSwagger({
                "swaggerDoc": "/docs",
                "schemeURL": "/swagger.json"
            });

            app.listen(process.env.PORT, (err) => {
                if (err) return console.error(err);
                console.log(`Server running at http://localhost:${process.env.PORT}/`);
            });
        });
})
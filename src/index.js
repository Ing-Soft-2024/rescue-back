import cors from "cors";
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

readRouter(app, {
    baseAPI: 'api',
    basePath: process.env.PRODUCTION ? 'dist/app' : 'src/app'
})
    .then(() => {
        /**
         * If needs some other configuration, you can add them here with app.
         */

        // DETERMINE WHETHER TO USE SWAGGER
        app.useSwagger({
            "swaggerDoc": "/docs",
            "schemeURL": "/swagger.json"
        });

        app.listen(process.env.PORT, (err) => {
            if (err) return console.error(err);
            console.log(`Server running at http://localhost:${process.env.PORT}/`);
        });
    });
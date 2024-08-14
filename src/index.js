import dotenv from "dotenv";
import readRouter from "./read.router.js";
import express from "./swagger.js";

dotenv.config();
const app = express();

readRouter(app)
    .then(() => {
        /**
         * If needs some other configuration, you can add them here with app.
         */

        // DETERMINE WHETHER TO USE SWAGGER
        app.useSwagger({
            "info": {
                "title": "Swagger Express",
                "description": "This is"
            },
            "swaggerDoc": "/docs",
            "schemeURL": "/swagger.json"
        });
        app.listen(process.env.PORT, (err) => {
            if (err) return console.error(err);
            console.log(`Server running at http://localhost:${process.env.PORT}/`);
        });
    });
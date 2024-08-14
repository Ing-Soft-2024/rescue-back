import { ApiOperationGet, ApiPath } from "swagger-express-ts";
import { SampleModel } from "./models/sample.model";

@ApiPath({
    "path": "/api/sample",
    "name": "Sample",
    "description": "Sample API",
})
export default class SampleRoute {

    @ApiOperationGet({
        "path": "/",
        "summary": "Sample API",
        "description": "Sample API",
        "responses": {
            "200": {
                "description": "Success",
                "model": "SampleModel",
            }
        },
    })
    GET = async (req, res) => {
        const sample = new SampleModel();
        return res.json({
            status: 'success',
            data: {
                message: 'Hello, World!'
            }
        });
    };
}
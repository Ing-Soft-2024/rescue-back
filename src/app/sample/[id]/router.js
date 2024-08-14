import { ApiOperationGet, ApiPath } from "swagger-express-ts";

@ApiPath({
    "path": "/api/sample/:id",
    "name": "SampleID",
    "description": "Sample ID API",
})
export default class SampleIDRoute {

    @ApiOperationGet({
        "path": "/",
        "summary": "Sample ID API",
        "description": "Sample ID API",
        "responses": {
            "200": {
                "description": "Success",
                "model": "SampleModel",
            }
        },
    })
    GET = async (req, res) => {

        return res.json({
            status: 'success',
            data: {
                message: req.params.id
            }
        });
    };
}
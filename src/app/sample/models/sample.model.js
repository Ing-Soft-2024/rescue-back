import { ApiModel, ApiModelProperty } from "swagger-express-ts";

@ApiModel({
    "description": "Sample Model",
    "name": "SampleModel",
})
export class SampleModel {
    @ApiModelProperty({
        "required": true,
        "description": "Sample name",
        "type": "number",
    })
    name;

    @ApiModelProperty({
        "required": true,
        "description": "Sample description",
        "type": "string",
    })
    email;
}
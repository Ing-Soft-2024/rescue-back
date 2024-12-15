import { ApiModel, ApiModelProperty } from "swagger-express-decorators";

@ApiModel({
    description: "Login Credentials Model",
    name: "LoginCredentials"
})
export class RegisterCredentials {
    @ApiModelProperty({
        description: "User's email address",
        required: true,
        type: "string",
        example: "user@example.com"
    })
    email;

    @ApiModelProperty({
        description: "User's password",
        required: true,
        type: "string",
        example: "password123"
    })
    password;
}
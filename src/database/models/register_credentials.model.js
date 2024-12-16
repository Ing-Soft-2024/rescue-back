import { ApiModel, ApiModelProperty } from "swagger-express-ts";

@ApiModel({
    description: "Register Credentials Model",
    name: "RegisterCredentials"
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

    @ApiModelProperty({
        description: "User's First Name",
        required: true,
        type: "string",
        example: "John"
    })
    firstName;

    @ApiModelProperty({
        description: "User's Last Name",
        required: true,
        type: "string",
        example: "Doe"
    })
    lastName;

    @ApiModelProperty({

        description: "User's address",
        required: true,
        type: "string",
        example: "123 Main St, Anytown, USA"
    })
    address;

    @ApiModelProperty({
        description: "User's city",
        required: true,
        type: "string",
        example: "Anytown"
    })
    city;

    @ApiModelProperty({
        description: "User's country",
        required: true,
        type: "string",
        example: "USA"
    })
    state;
}
export default RegisterCredentials;
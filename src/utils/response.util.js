import { ApiModel, ApiModelProperty } from "swagger-express-decorators";

/**
 * Response formula to handle promises.
 * @param {Response} res
 * @param {Promise<any>} promise 
 */
export const responseFormula = async (res, promise) => {
    promise
        .then((data) => res.json(data))
        .catch((err) => {
            console.error(err);
            res.status(400)
                .send({
                    "data": `[${err.name}]: ${err.message}`,
                    "message": err.message
                })
        })
}

@ApiModel({
    name: 'ErrorModel',
    description: 'Modelo de error.',
})
class ErrorModel {
    @ApiModelProperty({
        description: 'Datos del error.',
        required: true,
        example: 'Error al intentar obtener el archivo.'
    })
    data;

    @ApiModelProperty({
        description: 'Mensaje del error.',
        required: true,
        example: 'Error al intentar obtener el archivo.'
    })
    message;
}

ErrorModel;
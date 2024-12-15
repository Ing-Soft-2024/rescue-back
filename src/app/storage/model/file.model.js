const { ApiModel, ApiModelProperty } = require("swagger-express-ts");

@ApiModel({
    description: 'Modelo de archivo.',
    name: 'File'
})
export class FileModel {
    constructor(fileName, file) {
        this.fileName = fileName;
        this.file = file;
    }

    @ApiModelProperty({
        'description': 'Nombre del archivo.',
        'required': true,
    })
    fileName = '';

    @ApiModelProperty({
        'description': 'Archivo en base64.',
        'required': true,
    })
    file = '';
}
import { responseFormula } from "@/utils/response.util";
import { ApiOperationGet, ApiOperationPost, ApiPath } from "swagger-express-ts";
import { createBlob, getBlobData } from "./controller/storage.controller";
import { base64ToFile } from "./lib/base64ToFile";
import { FileModel } from "./model/file.model";

@ApiPath({
    'name': 'Storage',
    'path': '/storage',
    'description': 'Manipula archivos en el storage.'
})
export default class StorageController {
    /**
     * Streams the download of a file from the storage.
     * @param {Request} req 
     * @param {Response} res
     */
    @ApiOperationGet({
        'parameters': {
            'query': {
                'fileName': { 'name': 'fileName', 'required': true, 'type': 'string' }
            }
        },
        'responses': {
            '200': {
                'description': 'Success - Retorna un archivo en base64.',
                'type': 'success'
            },
        }
    })
    GET = async (req, res) => responseFormula(res, getBlobData(decodeURIComponent(req.query.fileName)))

    /**
     * Streams the upload of a file to the storage.
     * @param {Request} req
     * @param {Response} res
     */
    @ApiOperationPost({
        'description': 'Guarda un archivo en el storage.',
        'parameters': {
            'body': {
                'model': 'File'
            }
        },
        'responses': {
            '200': {
                'description': 'Success - Retorna un archivo en base64.',
                'type': 'success'
            },
        }
    })
    POST = async (req, res) => {
        console.log('guardar archivo ' + req.body.fileName);
        const fileModel = new FileModel(req.body.fileName, req.body.file);
        const file = base64ToFile(fileModel.file, fileModel.fileName);

        return responseFormula(res, createBlob(file.name, file));
    }
}
import { DataTypes, Model, Sequelize } from "sequelize";
import { ApiModel, ApiModelProperty } from "swagger-express-ts";
import { sequelize } from "../index";

@ApiModel({
    name: 'Category',
    description: 'Category model',
})
class MercadoPagoModel extends Model {
    @ApiModelProperty({
        description: 'Name',
        required: true,
        example: 'Category name',
        type: 'string',
    })
    access_token;

    @ApiModelProperty({
        description: 'Description',
        required: true,
        example: 'Category description',
        type: 'string',
    })
    refresh_token;

    @ApiModelProperty({
        description: 'Description',
        required: true,
        example: 'Category description',
        type: 'string',
    })
    expires_in;
}

/**
 * 
 * @param {Sequelize} sequelize
 * @param {Sequelize.DataTypes} DataTypes 
 */
const MercadoPago = sequelize.define('mercadopago', {
    "access_token": DataTypes.TEXT,
    "refresh_token": DataTypes.TEXT,
    "expires_in": DataTypes.INTEGER,
    "commerceId": DataTypes.INTEGER,
}, {
    timestamps: true,
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',

    tableName: 'categories',
});

/**
 * 
 * @param {*} models 
 */
MercadoPago.associate = function (models) {
    MercadoPago.hasMany(models.commerce, { foreignKey: 'commerceId' });
}

export default MercadoPago;
export { MercadoPago };

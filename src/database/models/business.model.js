import { DataTypes, Model, Sequelize } from "sequelize";
import { ApiModel, ApiModelProperty } from "swagger-express-ts";
import { sequelize } from "../index";

@ApiModel({
    name: 'Business',
    description: 'Business model',
})
class BusinessModel extends Model {
    @ApiModelProperty({
        description: 'Name',
        required: true,
        example: 'Comercio',
        type: 'string',
    })
    name;

    @ApiModelProperty({
        description: 'Address',
        required: true,
        example: 'Comercio address',
        type: 'string',
    })
    address;

    @ApiModelProperty({
        description: 'City',
        required: true,
        example: 'Comercio city',
        type: 'string',
    })
    city;

    @ApiModelProperty({
        description: 'Country',
        required: true,
        example: 'Comercio country',
        type: 'string',
    })
    country;

    @ApiModelProperty({
        description: 'Latitude',
        required: true,
        example: 10,
        type: 'number',
    })
    latitude;

    @ApiModelProperty({
        description: 'Longitude',
        required: true,
        example: 10,
        type: 'number',
    })
    longitude;
}

/**
 * 
 * @param {Sequelize} sequelize
 * @param {Sequelize.DataTypes} DataTypes 
 */
const Business = sequelize.define('business', {
    "name": DataTypes.TEXT,
    "address": DataTypes.TEXT,
    "city": DataTypes.TEXT,
    "country": DataTypes.TEXT,

    "latitude": DataTypes.DECIMAL,
    "longitude": DataTypes.DECIMAL,
}, {
    timestamps: true,
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',

    tableName: 'businesses',
});

/**
 * 
 * @param {*} models 
 */
Business.associate = function (models) {
    Business.belongsToMany(models.user, { through: models.user_business_roles, foreignKey: 'businessId' });
    Business.hasMany(models.product, { foreignKey: 'businessId' });

    Business.hasMany(models.user_favorite_business, { foreignKey: 'businessId' });
}

export default Business;
export { Business };

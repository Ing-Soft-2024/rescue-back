import { DataTypes, Sequelize } from "sequelize";
import { sequelize } from "../index";

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

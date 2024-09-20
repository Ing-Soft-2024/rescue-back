import { DataTypes, Sequelize } from "sequelize";
import { sequelize } from "../index";
/**
 * 
 * @param {Sequelize} sequelize
 * @param {Sequelize.DataTypes} DataTypes 
 */

const User = sequelize.define('user', {
    "firstName": DataTypes.TEXT,
    "lastName": DataTypes.TEXT,
    "dateOfBirth": DataTypes.DATE,
    "phoneNumber": DataTypes.TEXT,

    "address": DataTypes.TEXT,
    "city": DataTypes.TEXT,
    "state": DataTypes.TEXT,
    "country": DataTypes.TEXT,
}, {
    timestamps: true,
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    paranoid: true,
    tableName: 'users',
});

/**
 * 
 * @param {*} models 
 */
User.associate = function (models) {
    User.hasMany(models.user_favorite_product, { foreignKey: 'userId' });
    User.hasMany(models.user_favorite_business, { foreignKey: 'userId' });

    User.hasMany(models.order, { foreignKey: 'userId' });
}

export default User;
export { User };

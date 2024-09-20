import { DataTypes, Sequelize } from "sequelize";
import { sequelize } from "../index";

/**
 * 
 * @param {Sequelize} sequelize
 * @param {Sequelize.DataTypes} DataTypes 
 */
const UserFavoriteBusiness = sequelize.define('user_favorite_business', {
    "userId": DataTypes.INTEGER,
    "businessId": DataTypes.INTEGER,
}, {
    timestamps: true,
    createdAt: 'createdAt',

    tableName: 'user_favorite_businesses',
});

/**
 * 
 * @param {*} models 
 */
UserFavoriteBusiness.associate = function (models) { }

export default UserFavoriteBusiness;
export { UserFavoriteBusiness };

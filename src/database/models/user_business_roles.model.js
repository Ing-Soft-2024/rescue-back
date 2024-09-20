import { DataTypes, Sequelize } from "sequelize";
import { sequelize } from "../index";

/**
 * 
 * @param {Sequelize} sequelize
 * @param {Sequelize.DataTypes} DataTypes 
 */
const UserBusiness = sequelize.define('user_business_roles', {
    "userId": DataTypes.INTEGER,
    "businessId": DataTypes.INTEGER,
    "role": DataTypes.TEXT,
}, {
    timestamps: true,
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    paranoid: true,

    tableName: 'user_business_roles',
});

/**
 * 
 * @param {*} models 
 */
UserBusiness.associate = function (models) { }

export default UserBusiness;
export { UserBusiness };

import { DataTypes, Sequelize } from "sequelize";
import { sequelize } from "../index";

/**
 * 
 * @param {Sequelize} sequelize
 * @param {Sequelize.DataTypes} DataTypes 
 */
const UserAuth = sequelize.define('user_auth', {
    "userId": DataTypes.INTEGER,
    "email": DataTypes.TEXT,
    "passwordHash": DataTypes.TEXT,
    "authType": DataTypes.TEXT,
    "authId": DataTypes.TEXT,
}, {
    timestamps: true,
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',

    tableName: 'user_auth',
});

/**
 * 
 * @param {*} models 
 */
UserAuth.associate = function (models) {
    UserAuth.belongsTo(models.user, { foreignKey: 'userId' });
}

export default UserAuth;
export { UserAuth };

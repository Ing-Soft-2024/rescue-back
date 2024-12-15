import { DataTypes, Sequelize } from "sequelize";
import { sequelize } from "../index";
/**
 * 
 * @param {Sequelize} sequelize
 * @param {Sequelize.DataTypes} DataTypes 
 * 
 * 
 */

const User = sequelize.define('user', {
    "firstName": DataTypes.TEXT,
    "lastName": DataTypes.TEXT,
    "email": {
        type: DataTypes.TEXT,
        unique: true // Add unique constraint
    },
    "address": DataTypes.TEXT,
    "city": DataTypes.TEXT,
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
    // User.hasMany(models.user_favorite_product, { foreignKey: 'userId' });
    // User.hasMany(models.user_favorite_business, { foreignKey: 'userId' });

    User.hasMany(models.order, { foreignKey: 'userId' });
    User.hasOne(models.user_auth, { 
        foreignKey: 'userId',
        as: 'userAuth'  // This alias must match the 'as' in your include statement
    });
}

export default User;
export { User };

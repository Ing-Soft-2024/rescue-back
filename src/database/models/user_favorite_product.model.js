import { DataTypes, Sequelize } from "sequelize";
import { sequelize } from "../index";

/**
 * 
 * @param {Sequelize} sequelize
 * @param {Sequelize.DataTypes} DataTypes 
 */
const UserFavoriteProducts = sequelize.define('user_favorite_product', {
    "userId": DataTypes.INTEGER,
    "productId": DataTypes.INTEGER,
}, {
    timestamps: true,
    createdAt: 'createdAt',

    tableName: 'user_favorite_products',
});

/**
 * 
 * @param {*} models 
 */
UserFavoriteProducts.associate = function (models) { }

export default UserFavoriteProducts;
export { UserFavoriteProducts };

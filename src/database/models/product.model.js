import { DataTypes, Sequelize } from "sequelize";
import { sequelize } from "../index";

/**
 * 
 * @param {Sequelize} sequelize
 * @param {Sequelize.DataTypes} DataTypes 
 */
const Product = sequelize.define('product', {
    "businessId": DataTypes.INTEGER,
    "name": DataTypes.TEXT,
    "description": DataTypes.TEXT,
    "price": DataTypes.DECIMAL,
    "image": DataTypes.TEXT,
    "stock": DataTypes.INTEGER,
}, {
    timestamps: true,
    createdAt: 'createdAt',

    tableName: 'products',
});

/**
 * 
 * @param {*} models 
 */
Product.associate = function (models) {
    Product.belongsToMany(models.category, { through: models.product_categories, foreignKey: 'productId' });

    Product.hasMany(models.user_favorite_product, { foreignKey: 'productId' });
}

export default Product;
export { Product };

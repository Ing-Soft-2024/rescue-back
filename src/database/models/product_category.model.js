import { DataTypes, Sequelize } from "sequelize";
import { sequelize } from "../index";

/**
 * 
 * @param {Sequelize} sequelize
 * @param {Sequelize.DataTypes} DataTypes 
 */
const ProductCategories = sequelize.define('product_categories', {
    "productId": DataTypes.INTEGER,
    "categoryId": DataTypes.INTEGER,
}, {
    tableName: 'product_categoriess',
});

/**
 * 
 * @param {*} models 
 */
ProductCategories.associate = function (models) {
}

export default ProductCategories;
export { ProductCategories };

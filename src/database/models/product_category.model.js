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
    tableName: 'product_categories',
});

/**
 * 
 * @param {*} models 
 */
ProductCategories.associate = function (models) {
    ProductCategories.belongsTo(models.product, { foreignKey: 'productId' });
    ProductCategories.belongsTo(models.category, { foreignKey: 'categoryId' });
}

export default ProductCategories;
export { ProductCategories };

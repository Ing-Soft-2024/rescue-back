import { DataTypes, Sequelize } from "sequelize";
import { sequelize } from "../index";

/**
 * 
 * @param {Sequelize} sequelize
 * @param {Sequelize.DataTypes} DataTypes 
 */
const Category = sequelize.define('category', {
    "name": DataTypes.TEXT,
    "description": DataTypes.TEXT,
}, {
    timestamps: true,
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',

    tableName: 'categories',
});

/**
 * 
 * @param {*} models 
 */
Category.associate = function (models) {
}

export default Category;
export { Category };

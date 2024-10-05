import { DataTypes, Model, Sequelize } from "sequelize";
import { ApiModel, ApiModelProperty } from "swagger-express-decorators";
import { sequelize } from "../index";

@ApiModel({
    name: 'Category',
    description: 'Category model',
})
class CategoryModel extends Model {
    @ApiModelProperty({
        description: 'Name',
        required: true,
        example: 'Category name',
        type: 'string',
    })
    name;

    @ApiModelProperty({
        description: 'Description',
        required: true,
        example: 'Category description',
        type: 'string',
    })
    description;
}

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

import { DataTypes, Model, Sequelize } from "sequelize";
import { ApiModel, ApiModelProperty } from "swagger-express-decorators";
import { sequelize } from "../index";

/**
 * 
 * @param {Sequelize} sequelize
 * @param {Sequelize.DataTypes} DataTypes 
 */
@ApiModel({
    name: 'Product',
    description: 'Product model',
})
class ProductModel extends Model {
    @ApiModelProperty({
        description: 'Business id',
        required: true,
        example: 1,
        type: 'integer',
    })
    businessId;

    @ApiModelProperty({
        description: 'Name',
        required: true,
        example: 'Product name',
        type: 'string',
    })
    name;

    @ApiModelProperty({
        description: 'Description',
        required: true,
        example: 'Product description',
        type: 'string',
    })
    description;

    @ApiModelProperty({
        description: 'Price',
        required: true,
        example: 10,
        type: 'number',
    })
    price;

    @ApiModelProperty({
        description: 'Image',
        required: true,
        example: 'https://example.com/image.png',
        type: 'string',
    })
    image;

    @ApiModelProperty({
        description: 'Stock',
        required: true,
        example: 10,
        type: 'integer',
    })
    stock;
}

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
    paranoid: true,
    tableName: 'products',
});

/**
 * 
 * @param {*} models 
 */
Product.associate = function (models) {
    Product.belongsToMany(models.category, { through: models.product_categories, foreignKey: 'productId' });
    Product.belongsToMany(models.user, { through: models.user_favorite_product, foreignKey: 'productId' });
}

export default Product;
export { Product };

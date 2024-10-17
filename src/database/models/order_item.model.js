import { DataTypes, Model, Sequelize } from "sequelize";
import { ApiModel, ApiModelProperty } from "swagger-express-decorators";
import { sequelize } from "../index";
@ApiModel({
    name: 'OrderItem',
    description: 'OrderItem model',
})
class OrderItemModel extends Model {
    @ApiModelProperty({
        description: 'Order id',
        required: true,
        example: 1,
        type: 'integer',
    })
    orderId;

    @ApiModelProperty({
        description: 'Product id',
        required: true,
        example: 1,
        type: 'integer',
    })
    productId;

    @ApiModelProperty({
        description: 'Quantity',
        required: true,
        example: 1,
        type: 'integer',
    })
    quantity;

    @ApiModelProperty({
        description: 'Precio para que en caso de cambios en el producto del comercio, no cambié el valor que vió el usuario',
        required: true,
        example: 1,
        type: 'double',
    })
    price;
}

/**
 * 
 * @param {Sequelize} sequelize
 * @param {Sequelize.DataTypes} DataTypes 
 */
const OrderItem = sequelize.define('order_item', {
    "orderId": DataTypes.INTEGER,
    "productId": DataTypes.INTEGER,
    "quantity": DataTypes.INTEGER,
    "price": DataTypes.DOUBLE
}, {
    timestamps: true,
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',

    tableName: 'order_items',
});

/**
 * 
 * @param {*} models 
 */
OrderItem.associate = function (models) {
    OrderItem.hasOne(models.product, { foreignKey: 'productId' });
}

export default OrderItem;
export { OrderItem };

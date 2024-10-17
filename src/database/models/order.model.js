import { DataTypes, Model, Sequelize } from "sequelize";
import { ApiModel, ApiModelProperty } from "swagger-express-decorators";
import { sequelize } from "../index";

@ApiModel({
    name: 'Order',
    description: 'Order model',
})
class OrderModel extends Model {
    @ApiModelProperty({
        description: 'User id',
        required: false,
        example: 1,
        type: 'integer',
    })
    userId;

    @ApiModelProperty({
        description: 'Business id',
        required: false,
        example: 1,
        type: 'integer',
    })
    businessId;

    @ApiModelProperty({
        description: 'total',
        required: false,
        example: 1,
        type: 'double',
    })
    total;
}

/**
 * 
 * @param {Sequelize} sequelize
 * @param {Sequelize.DataTypes} DataTypes 
 */
const Order = sequelize.define('order', {
    "userId": DataTypes.INTEGER,
    "businessId": DataTypes.INTEGER,
}, {
    timestamps: true,
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',

    tableName: 'orders',
});

/**
 * 
 * @param {*} models 
 */
Order.associate = function (models) {
    Order.belongsTo(models.business, { foreignKey: 'businessId' });
    Order.hasMany(models.order_item, { foreignKey: 'orderId' });
}

export default Order;
export { Order };

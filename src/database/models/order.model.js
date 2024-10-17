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
        description: 'qr string',
        required: true,
        example: "4b24c032-23f3-44ed-b49a-8f099a149469",
        type: 'string',
    })
    qrString;
}

/**
 * 
 * @param {Sequelize} sequelize
 * @param {Sequelize.DataTypes} DataTypes 
 */
const Order = sequelize.define('order', {
    "userId": DataTypes.INTEGER,
    "businessId": DataTypes.INTEGER,
    "qrString": DataTypes.STRING,
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

import { DataTypes, Sequelize } from "sequelize";
import { sequelize } from "../index";

/**
 * 
 * @param {Sequelize} sequelize
 * @param {Sequelize.DataTypes} DataTypes 
 */
const OrderItem = sequelize.define('order_item', {
    "orderId": DataTypes.INTEGER,
    "productId": DataTypes.INTEGER,
    "quantity": DataTypes.INTEGER,
    "price": DataTypes.DECIMAL,
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

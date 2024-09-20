import { DataTypes, Sequelize } from "sequelize";
import { sequelize } from "../index";

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
    Order.belongsToMany(models.business, { through: models.order_business_status, foreignKey: 'orderId' });
    Order.hasMany(models.order_item, { foreignKey: 'orderId' });
}

export default Order;
export { Order };

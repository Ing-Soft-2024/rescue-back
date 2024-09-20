import { DataTypes, Sequelize } from "sequelize";
import { sequelize } from "../index";

/**
 * 
 * @param {Sequelize} sequelize
 * @param {Sequelize.DataTypes} DataTypes 
 */
const OrderBusinessStatus = sequelize.define('order_business_status', {
    "orderId": DataTypes.INTEGER,
    "businessId": DataTypes.INTEGER,
    "status": DataTypes.TEXT,
}, {
    timestamps: true,
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',

    tableName: 'order_business_status',
});

/**
 * 
 * @param {*} models 
 */
OrderBusinessStatus.associate = function (models) {
    // User.hasMany(models.Product);
}

export default OrderBusinessStatus;
export { OrderBusinessStatus };

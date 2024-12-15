import { DataTypes, Model, Sequelize } from "sequelize";
import { ApiModel, ApiModelProperty } from "swagger-express-ts";
import { sequelize } from "../index";

@ApiModel({
    name: 'MercadoPago',
    description: 'MercadoPago model',
})
class MercadoPagoModel extends Model {
    @ApiModelProperty({
        description: 'Order ID',
        required: true,
        example: 1,
        type: 'integer',
    })
    orderId;

    @ApiModelProperty({
        description: 'Payment ID',
        required: true,
        example: '12345678',
        type: 'string',
    })
    paymentId;

    @ApiModelProperty({
        description: 'Status',
        required: true,
        example: 'approved',
        type: 'string',
    })
    status;
}

const MercadoPago = sequelize.define('mercadopago', {
    orderId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    paymentId: {
        type: DataTypes.STRING,
        allowNull: false
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    timestamps: true,
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    tableName: 'mercadopago',
});

MercadoPago.associate = function(models) {
    // Make sure we're using the correct model name and it exists
    if (models.order) {
        MercadoPago.belongsTo(models.order, {
            foreignKey: 'orderId',
            as: 'order'
        });
    }
};

export default MercadoPago;
export { MercadoPago };

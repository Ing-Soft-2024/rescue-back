import { Op } from 'sequelize';
import Business from "database/models/business.model";
import Product from 'database/models/product.model';
import Order from "database/models/order.model";
import OrderItem from "database/models/order_item.model";

export const getListOfOrders = async (userId, businessId) => {
    try {
        const whereClause = {};

        if (userId !== null && userId !== undefined) {
            whereClause.userId = userId;
        }

        if (businessId !== null && businessId !== undefined) {
            whereClause.businessId = businessId;
        }

        const orders = await Order.findAll({
            include: [
                {
                    model: OrderItem,
                    attributes: ['productId', 'quantity', 'price'],
                    include: [
                        {
                            model: Product,
                            attributes: ['name'],
                        }
                    ]
                },
                {
                    model: Business,
                    attributes: ['name'],
                }
            ],
            where: {
                [Op.or]: whereClause
            },
            order: [['createdAt', 'DESC']]
        });

        // Add totalPrice field to each order
        const ordersWithTotalPrice = orders.map(order => {
            const orderData = order.get({ plain: true });
            console.log("ORDER DATA: ", orderData);
            const totalPrice = orderData.order_items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
            return {
                ...orderData,
                totalPrice
            };
        });

        // Debugging output with safety checks
        if (ordersWithTotalPrice.length > 0) {
            console.log("Orden 1: ", ordersWithTotalPrice[0]);
            console.log("Business: ", ordersWithTotalPrice[0].business);
            console.log("OrderItems: ", ordersWithTotalPrice[0].order_items);
            
            // Only log product if order_items array is not empty
            if (ordersWithTotalPrice[0].order_items.length > 0) {
                console.log("Product 1: ", ordersWithTotalPrice[0].order_items[0].product);
            }
        }

        return ordersWithTotalPrice;
    } catch (err) {
        console.error(err);
        throw new Error("Error al obtener las órdenes");
    }
};

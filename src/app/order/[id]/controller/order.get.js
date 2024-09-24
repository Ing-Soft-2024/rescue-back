import Order from "database/models/order.model";
import OrderItem from "database/models/order_item.model";

export const getOrderById = async (id) => {
    const order = await Order.findByPk(id, {
        include: [{
            model: OrderItem,
        }]
    }).catch((err) => {
        console.error(err);
        throw new Error("Error al obtener el pedido");
    });

    if (!order) throw new Error("No se encontró el pedido");
    return order;
}

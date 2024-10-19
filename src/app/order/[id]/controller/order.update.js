import Order from "database/models/order.model";



export const updateOrderStatus = async (id, status) => {
    const order = await Order.findByPk(id);
    if (!order) throw new Error("No se encontró el pedido");
    order.status = status;
    await order.save();
    return order;
}

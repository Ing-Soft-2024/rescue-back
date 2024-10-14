import Order from "database/models/order.model";

export const postOrder =async (data) => {
    const order =
    await Order.create(data)
        .catch((err) => {
            console.error(err);
            throw new Error("Error al agregar el item");
        });
    console.log("order: ",order.id);
    return {
            orderId: order.id,
            userId: order.userId,
            status: order.status,
            total: order.total
    };
}
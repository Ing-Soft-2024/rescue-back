import Order from "database/models/order.model";

export const postOrder =async (data) => {
    console.log("data: ",data);
    const order =
    await Order.create(data)
        .catch((err) => {
            console.error(err);
            throw new Error("Error al agregar el item");
        });
    console.log("order: ",order.id);
    console.log("orderQRString: ",order.qrString);
    return {
            orderId: order.id,
            userId: order.userId,
            status: order.status,
            qrString: order.qrString
    };
}
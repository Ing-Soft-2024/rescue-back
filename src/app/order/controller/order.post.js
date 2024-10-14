import Order from "database/models/order.model";

export const postOrder =async (data) => {
    const order =
    await Order.create(data)
        .catch((err) => {
            console.error(err);
            throw new Error("Error al agregar el item");
        });

    return order;
}
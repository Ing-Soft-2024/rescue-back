import Order from "database/models/order.model";
import OrderItem from "database/models/order_item.model";

export const postOrder =async (data) => {
    console.log("data: ",data);
    const cart = data.cart;
    if(!cart) throw new Error("Cart is required");

    const order =  await Order.create(data) 
        .catch((err) => {
            console.error(err);
            throw new Error("Error al crear el pedido");
        });

    const orderItems = await OrderItem.bulkCreate(cart.map((item) => {
        console.log("item: ", item.product);
        return {
            "orderId": order.id,
            "productId": item.product.id,
            "quantity": item.quantity,
            "price": Number(item.product.price)
        }
    })).catch((err) => {
        order.destroy();
        throw new Error("Error al crear el pedido");
    });

    console.log("orderItems: ", orderItems[0].toJSON());
    console.log("order: ",order.id);
    return {
            orderId: order.id,
            userId: order.userId,
            status: order.status,
    };
}
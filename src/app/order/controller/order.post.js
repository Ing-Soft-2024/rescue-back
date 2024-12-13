import Order from "database/models/order.model";
import OrderItem from "database/models/order_item.model";
import Product from "database/models/product.model";


export const postOrder =async (data) => {
    console.log("data: ",data);
    const cart = data.cart;
    if(!cart) throw new Error("Cart is required");

    const order =  await Order.create(data) 
        .catch((err) => {
            console.error(err);
            throw new Error("Error al crear el pedido");
        });

    const orderItems = await OrderItem.bulkCreate(cart.map(async (item) => {
        const product = await Product.findByPk(item.product.id);
        if(!product) throw new Error("Product not found");
        product.stock = product.stock - item.quantity;
        await product.save();
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
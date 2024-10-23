import Order from "database/models/order.model";
import OrderItem from "database/models/order_item.model";
import Product from "database/models/product.model";

export const getOrderById = async (id) => {
    const order = await Order.findByPk(id, {
        include: [{
            model: OrderItem,
            include: [
                { model: Product, }
            ]
        }]
    }).catch((err) => {
        console.error(err);
        throw new Error("Error al obtener el pedido");
    });

    if (!order) throw new Error("No se encontró el pedido");
    const orderItems = order.getDataValue('order_items');
    const total = orderItems.reduce((acc, item) => acc + item.price, 0);


    const toReturn = order.toJSON();
    const asyncOrderItes = orderItems.map(async (item) => {
        const product = await Product.findByPk(item.productId);
        return {
            ...item.toJSON(),
            product
        }
    });
    toReturn.order_items = await Promise.all(asyncOrderItes);

    return {
        ...toReturn,
        total
    };
}

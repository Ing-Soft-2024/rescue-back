import OrderItem from "database/models/order_item.model";
import Product from "database/models/product.model";

export const postOrderItem =async (data) => {
    const item =
    await OrderItem.create(data)
        .catch((err) => {
            console.error(err);
            throw new Error("Error al agregar el item");
        });
        console.log("item.productId: ",item.productId);
        
        const product = await Product.findByPk(item.productId);
        if(!product){
            throw new Error("Product not found");
        }
        console.log("Product.findByPk(item.productId): ",product);
        console.log("price: ",product.price);
    return {
            orderItemid: item.id,
            productId: item.productId,
            price: product.price,
            quantity: item.quantity
    };
    
}
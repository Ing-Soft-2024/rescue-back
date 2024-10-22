import Product from "database/models/product.model";

export const addProduct = async (data) => {
    const product = await Product.create(data, {

    })
        .catch((err) => {
            console.error(err);
            throw new Error("Error al agregar el producto");
        });

        console.log(product.product_id);

    return product;
}
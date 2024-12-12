import Product from "database/models/product.model";

export const addProduct = async (data) => {

    console.log("DATA ADD PRODUCT", data);
    const product = await Product.create(data, {

    })
        .catch((err) => {
            console.error(err);
            throw new Error("Error al agregar el producto");
        });

    console.log("PRODUCT ADD", product);

    return product;
}
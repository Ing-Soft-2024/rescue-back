import Product from "database/models/product.model";

export const getProductById = async (id) => {
    const product = await Product.findByPk(id)
        .catch((err) => {
            console.error(err);
            throw new Error("Error al obtener el producto");
        });
    if (!product) throw new Error("No se encontró el producto");
    return product;
}
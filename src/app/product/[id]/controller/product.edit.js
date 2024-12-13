import Product from "database/models/product.model";

export const editProduct = async (id, data) => {
    const product = await Product.findByPk(id)
        .catch((err) => {
            console.error(err);
            throw new Error("Error al obtener el producto");
        });

    if (!product) throw new Error("No se encontró el producto");

    product.setAttributes(data);

    await product.save()
        .catch((err) => {
            console.error(err);
            throw new Error("Error al editar el producto");
        });
}
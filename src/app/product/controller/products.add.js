import Product from "database/models/product.model";

export const addProduct = async (data) => {
    const { categories, ...productData } = data;
    
    const product = await Product.create(productData)
        .catch((err) => {
            console.error(err);
            throw new Error("Error al agregar el producto");
        });

    // Add categories if provided
    if (categories && Array.isArray(categories)) {
        await product.setCategories(categories)
            .catch((err) => {
                console.error(err);
                throw new Error("Error al asignar categorías al producto");
            });
    }

    return product;
}
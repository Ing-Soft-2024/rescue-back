import Product from "database/models/product.model";

export const deleteProduct = async (id) => {
    await Product.destroy({
        where: { id }
    }).catch((err) => {
        console.error(err);
        throw new Error("Error al eliminar el producto");
    });

    return {
        "status": 'success',
        "data": {
            message: 'Product deleted',
        }
    };
} 
import Category from "database/models/category.model";
import Product from "database/models/product.model";

export const getCategories = async () => {
    // throw new Error("Error al obtener las categorías");
    const categories = await Category.findAll({
        includes: [{ model: Product }]
    })
        .catch((err) => {
            console.error(err);
            throw new Error("Error al obtener las categorías");
        });

    return categories;
}
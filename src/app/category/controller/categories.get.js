import Category from "database/models/category.model";

export const getCategories = async () => {
    const categories = await Category.findAll()
        .catch((err) => {
            console.error(err);
            throw new Error("Error al obtener las categorías");
        });

    return categories;
}
import Category from "database/models/category.model";

export const getCategoryById = async (id) => {
    const category = await Category.findByPk(id)
        .catch((err) => {
            console.error(err);
            throw new Error("Error al obtener la categoría");
        });

    if (!category) throw new Error("No se encontró la categoría");
    return category;
}
import Business from "database/models/business.model";
import Category from "database/models/category.model";
import Product from "database/models/product.model";

export const getCommerceById = async (id) => {
    console.log("----------------ID--------------", id);
    const commerce = await Business.findByPk(id, {
        include: [{
            model: Product,
            include: [{
                attributes: ['name'],
                model: Category
            }]
        }]
    }).catch((err) => {
        console.error(err);
        throw new Error("Error al obtener el comercio");
    });

    if (!commerce) throw new Error("No se encontró el comercio");
    return commerce;
}
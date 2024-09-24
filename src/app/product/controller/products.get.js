import Category from "database/models/category.model";
import Product from "database/models/product.model";

export const getListOfProducts = async (categoryId, businessId) => {

    const where = {
        "categoryId": categoryId ?? null,
        "businessId": businessId ?? null
    }
    !categoryId && delete where.categoryId;
    !businessId && delete where.businessId;

    const products = await Product.findAll({
        include: [{
            model: Category,
            attributes: ['name', 'description']
        }],
        where
    });

    return products;
}
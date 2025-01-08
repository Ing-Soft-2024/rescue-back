import { Sequelize } from "sequelize";
import Category from "database/models/category.model";
import Product from "database/models/product.model";
import Business from "database/models/business.model";

export const getNearProducts = async (categoryId, userLongitude, userLatitude, search) => {
    const where = {
        categoryId: categoryId ?? null,
        deletedAt: null,
    };
    if (!categoryId) delete where.categoryId;

    // Add similarity search condition if search term is provided
    if (search) {
        const safeSearch = search.replace(/'/g, "''");
        where[Sequelize.Op.and] = Sequelize.literal(`similarity("product"."name", '${safeSearch}') > 0.3`);
    }

    let products = await Product.findAll({
        include: [
            {
                model: Category,
                attributes: ['name', 'description']
            },
            {
                model: Business,
                where: Sequelize.where(
                    Sequelize.literal(`
                        6371 * acos(cos(radians(${userLatitude})) * cos(radians(Business.latitude)) * cos(radians(${userLongitude}) - radians(Business.longitude)) + sin(radians(${userLatitude})) * sin(radians(Business.latitude)))
                    `),
                    '<',
                    2  // Distance in kilometers
                ),
            }
        ],
        where,
        // Add ordering by similarity if search term is provided
        ...(search && {
            order: [[Sequelize.literal(`similarity("product"."name", '${search.replace(/'/g, "''")}') DESC`)]],
        })
    });
    
    return products;
};

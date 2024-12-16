import { Sequelize } from "sequelize";
import Category from "database/models/category.model";
import Product from "database/models/product.model";
import Business from "database/models/business.model";

import levenshtein from "js-levenshtein";

export const getNearProducts = async (categoryId, userLongitude, userLatitude, search) => {
    console.log("GETNEARPRODUCTS");
    const where = {
        categoryId: categoryId ?? null,
        deletedAt: null,
    };
    if (!categoryId) delete where.categoryId;

    console.log("Received coordinates:", {
        userLatitude,
        userLongitude
    });

    // Also log a few businesses' coordinates
    const businesses = await Business.findAll({
        attributes: ['id', 'latitude', 'longitude']
    });
    console.log("Available businesses:", businesses);

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
        where
    });

    console.log("SEARCH", search);
    if (search) {
        const searchLower = search.toLowerCase();
        products = products.filter(product => {
            const productName = product.name.toLowerCase();
            const distance = levenshtein(searchLower, productName);
            return distance < 3; // Adjust the threshold as needed
        });
    }
    
    console.log(products);
    return products;
};

// const CategoryMock = jest.mock("database/models/category.model", () => {
//     // Initialize SequelizeMock and define the CategoryMock model within the jest.mock scope
//     const SequelizeMock = require('sequelize-mock');
//     const dbMock = new SequelizeMock();
//     const category=  dbMock.define('Category', {
//         id: 1,
//         name: 'Comida',
//         description: 'Comida'
//     });
    
//     return category;
// });
  

// Import your functions after defining the mock
const { getCategories } = require("app/categories/controller/categories.get");
const { getCategoryById } = require("app/categories/[id]/controller/category.get");
const { getCommerceById }= require("app/commerce/[id]/controller/commerce.get");


test('Get categories', async () => {
    await getCategories()
        .then((categories) => {
            expect(categories instanceof Array).toBe(true);
            expect(categories.length).toBeGreaterThan(0);
            expect(categories[0].name).toBe('Comida');
            console.log("Categories retrieved successfully");
            console.log(categories);
        })
        .catch((err) => {
            expect(err).toBe("Error while fetching categories");
        });
});

test('Get commerce by id', async () => {
    await getCommerceById(1)
        .then((commerce) => {
            console.log("Commerce: ", commerce);
            expect(commerce.name).toBe('Comercio');
            expect(commerce.address).toBe('Comercio address');
            expect(commerce.city).toBe('Comercio city');
            expect(commerce.country).toBe('Comercio country');
            expect(commerce.latitude).toBe(10);
            expect(commerce.longitude).toBe(10);
        })
        .catch((err) => {
            console.error("Error fetching commerce by id:", err);
        });
});

test('Get category by id', async () => {
    const category = await getCategoryById(1);
    expect(category.name).toBe('Comida');
    expect(category.description).toBe('Comida');
});

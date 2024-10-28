
const { getCategories } = require("app/categories/controller/categories.get");
const { getCategoryById } = require("app/categories/[id]/controller/category.get");



describe('Category Tests', () => {

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



test('Get category by id', async () => {
    const category = await getCategoryById(1);
    expect(category.name).toBe('Comida');
    expect(category.description).toBe('Comida');
});

});
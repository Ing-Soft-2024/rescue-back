// Using babel-jest

const { getCategoryById } = require("app/categories/[id]/controller/category.get");
const { getCategories } = require("app/categories/controller/categories.get");
const { default: Category } = require("database/models/category.model");

test('Get categories', async () => {
    await getCategories()
        .then((categories) => {
            expect(categories instanceof Array).toBe(true);
            expect(categories instanceof Category).toBe(false);
            if (categories.length > 0) expect(categories[0] instanceof Category).toBe(true);

            console.log("Categorías obtenidas correctamente");
        })
        .catch((err) => {
            expect(err).toBe("Error al obtener las categorías");
        })

})

test('Get category by id', async () => {
    const category = await getCategoryById(1);
    expect(category instanceof Category).toBe(true);
    expect(category.name).toBe('Comida');
    expect(category.description).toBe('Comida');
})
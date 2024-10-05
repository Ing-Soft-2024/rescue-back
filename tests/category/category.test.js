// Using babel-jest

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
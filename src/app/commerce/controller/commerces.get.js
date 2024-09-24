import Business from "database/models/business.model";

export const getCommerces = async () => {
    const commerces = await Business.findAll()
        .catch((err) => {
            console.error(err);
            throw new Error("Error al obtener los comercios");
        });

    return commerces;
}
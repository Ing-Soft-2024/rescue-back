import Business from "database/models/business.model";

export const addCommerce = async (data) => {
    const commerce =
        await Business.create(data)
            .catch((err) => {
                console.error(err);
                throw new Error("Error al agregar el comercio");
            });

    return commerce;
}
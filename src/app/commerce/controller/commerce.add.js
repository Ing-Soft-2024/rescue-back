import Business from "database/models/business.model";
import User from "database/models/user.model";
import UserBusiness from "database/models/user_business_roles.model";
import { getCoordinates } from "utils/geocoder.util";

export const addCommerce = async (data) => {
    let commerceData = Object.assign({}, data);
    delete commerceData.userId;

    const userByEmail = await User.findByPk(data.userId).catch((err) => {
        console.error(err);
        throw new Error("Error al obtener el usuario");
    });
    if(!Boolean(userByEmail)) throw new Error("Error al obtener el usuario");

    // Verificar ubicacion del comercio por medio de la API de Google Maps
    // Pais, ciudad, direccion -> coordenadas
    console.log("COMMERCE DATA:",commerceData);
    const coordinates = await getCoordinates(commerceData.country, commerceData.city, commerceData.address);
    console.log("GEOCODER DATA:",coordinates);
    commerceData = Object.assign(commerceData, {
        latitude: coordinates[0].latitude,
        longitude: coordinates[0].longitude,
        streetName: coordinates[0].streetName,
        streetNumber: coordinates[0].streetNumber,
        city: coordinates[0].city,
        country: coordinates[0].country,
        address: coordinates[0].formattedAddress
    });
    console.log("COMMERCE DATA:",commerceData);

    const commerce =
        await Business.create(commerceData)
            .catch((err) => {
                console.error(err);
                throw new Error("Error al agregar el comercio");
            });
    if(!Boolean(commerce)) throw new Error("Error al agregar el comercio");

    

    const userBusiness = await UserBusiness.create({
        "userId": userByEmail.getDataValue("id"),
        "businessId": commerce.id
    }).catch((err) => {
        console.error(err);
        // Eliminamos el comercio que acabamos de crear
        commerce.destroy();
        throw new Error("Error al agregar el rol de usuario en el comercio");
    });
    if(!Boolean(userBusiness)) {
        // Eliminamos el comercio que acabamos de crear
        commerce.destroy();
        throw new Error("Error al agregar el rol de usuario en el comercio");
    };
    return commerce;
}
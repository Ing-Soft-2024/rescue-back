import Business from "database/models/business.model";
import UserAuth from "database/models/user_auth.model";
import UserBusiness from "database/models/user_business_roles.model";

export const addCommerce = async (data) => {
    const commerceData = data;
    delete commerceData.userId;

    const commerce =
        await Business.create(commerceData)
            .catch((err) => {
                console.error(err);
                throw new Error("Error al agregar el comercio");
            });
    if(!Boolean(commerce)) throw new Error("Error al agregar el comercio");

    const userByEmail = await UserAuth.findOne({
        where: {
            "email": data.email
        }
    }).catch((err) => {
        console.error(err);
        throw new Error("Error al obtener el usuario");
    });

    const userBusiness = await UserBusiness.create({
        "userId": userByEmail.getDataValue("userId"),
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
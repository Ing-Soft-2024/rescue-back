import Business from "database/models/business.model";
import UserBusiness from "database/models/user_business_roles.model";

export const hasBusiness = async (userId) => {
    const userBusinessRole = await UserBusiness.findOne({
        where: {
            userId
        },
    }).catch((err) => {
        console.error(err);
        throw new Error("Error al obtener el rol de usuario en el comercio");
    });

    if(!Boolean(userBusinessRole)) throw new Error("El usuario no tiene comercios");
    const { businessId } = userBusinessRole;
    
    const businessData = await Business.findByPk(businessId);
    return businessData;
}
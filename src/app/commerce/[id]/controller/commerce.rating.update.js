import Business from "database/models/business.model";


export const updateCommerceRating = async (id, body) => {

    
    console.log("bodyyyyy"  , body);
    const rating = body.rating;
    
    const commerce = await Business.findByPk(id, {
        attributes: {
            exclude: ['createdAt', 'updatedAt']
        },
    }).catch((err) => {
        console.error(err);
        throw new Error("Error al obtener el comercio");
    });

    if (!commerce) throw new Error("No se encontró el comercio");

    console.log("ratinggggg", rating);
    console.log("ratingsumOLD", commerce.ratingSum);

    commerce.ratingSum = Number(commerce.ratingSum);
    commerce.ordersRated++;
    commerce.ratingSum += rating;
    commerce.avgRating = commerce.ratingSum / commerce.ordersRated;


    //round it to 0.5
    commerce.avgRating *= 2;
    commerce.avgRating = Math.round(commerce.avgRating);
    commerce.avgRating /= 2;

    
    console.log("ratingsumNEW", commerce.ratingSum);
 

    await commerce.save().catch((err) => {
        console.error(err);
        throw new Error("Error al actualizar la puntuacion");
    });


    
    return commerce;
}
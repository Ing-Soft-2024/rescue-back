// import { getCommerceById } from "app/commerce/[id]/controller/commerce.get";
// import { addCommerce } from "app/commerce/controller/commerce.add";
// import { getCommerces } from "app/commerce/controller/commerces.get";
// import { Business } from "app/database/models/business.model";

// let globalCommerce;
// describe('Commerce Tests', () => {

//     beforeAll(async () => {
//         globalCommerce = await addCommerce({
//             name: 'Comercio',
//             address: 'Comercio address',
//             city: 'Comercio city',
//             country: 'Comercio country',
//             latitude: 10,
//             longitude: 10
//         })

//         console.log("Global commerce: ", globalCommerce);
//     })

//     test('Get commerce by id', async () => {
//         const commerce = await getCommerceById(globalCommerce.getDataValue('id'));
//         expect(commerce instanceof Business).toBe(true);
//         expect(commerce.name).toBe('Comercio');
//         expect(commerce.address).toBe('Comercio address');
//         expect(commerce.city).toBe('Comercio city');
//         expect(commerce.country).toBe('Comercio country');
//         expect(commerce.latitude).toBe(10);
//         expect(commerce.longitude).toBe(10);
//     })

//     test('Get all commerces', async () => {
//         const commerces = await getCommerces();
//         expect(commerces instanceof Array).toBe(true);
//         expect(commerces instanceof Business).toBe(false);
//         if (commerces.length > 0) expect(commerces[0] instanceof Business).toBe(true);

//         console.log("Commerces obtained correctly");
//     })
// })
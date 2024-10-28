
import { addCommerce } from "app/commerce/controller/commerce.add";
import { getCommerces } from "app/commerce/controller/commerces.get";
import Business from "database/models/business.model";
const { getCommerceById }= require("app/commerce/[id]/controller/commerce.get");




let globalCommerce;
describe('Commerce Tests', () => {

    beforeAll(async () => {
        globalCommerce = await addCommerce({
            name: 'Comercio',
            address: 'Comercio address',
            city: 'Comercio city',
            country: 'Comercio country',
            latitude: 10,
            longitude: 10
        })
    })

    test('Get commerce by id', async () => {
        await getCommerceById(globalCommerce.id)
            .then((commerce) => {
                console.log("Commerce: ", commerce);
                expect(commerce.name).toBe('Comercio');
                expect(commerce.address).toBe('Comercio address');
                expect(commerce.city).toBe('Comercio city');
                expect(commerce.country).toBe('Comercio country');
                expect(commerce.latitude).toBe(10);
                expect(commerce.longitude).toBe(10);
            })
            .catch((err) => {
                console.error("Error fetching commerce by id:", err);
            });
    });

    test('Get all commerces', async () => {
        const commerces = await getCommerces();
        expect(commerces instanceof Array).toBe(true);
        expect(commerces instanceof Business).toBe(false);
        if (commerces.length > 0) expect(commerces[0] instanceof Business).toBe(true);

        console.log("Commerces obtained correctly");
    });
})
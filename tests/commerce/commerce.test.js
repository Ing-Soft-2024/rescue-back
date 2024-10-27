import { getCommerceById } from "app/commerce/[id]/controller/commerce.get";
import { addCommerce } from "app/commerce/controller/commerce.add";
import { getCommerces } from "app/commerce/controller/commerces.get";
import Business from "database/models/business.model";


// const getCommerceById = require("app/commerce/[id]/controller/commerce.get").getCommerceById;
// const addCommerce = require("app/commerce/controller/commerce.add").addCommerce;



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

     // console.log("Global commerce: ", globalCommerce);
    })

    test('Get commerce by id', async () => {
        const commerce = await getCommerceById(1);
        console.log("Commerce name: ", commerce.name);
        console.log("Commerce address: ", commerce.address);
        console.log("Commerce city: ", commerce.city);
        console.log("Commerce country: ", commerce.country);
        console.log("Commerce latitude: ", commerce.latitude);
        console.log("Commerce longitude: ", commerce.longitude);
        
        //expect(commerce instanceof Business).toBe(true);
      
        expect(commerce.name).toBe('Comercio');
        expect(commerce.address).toBe('Comercio address');
        expect(commerce.city).toBe('Comercio city');
        expect(commerce.country).toBe('Comercio country');
        expect(commerce.latitude).toBe(10);
        expect(commerce.longitude).toBe(10);
    })

    test('Get all commerces', async () => {
        const commerces = await getCommerces();
        expect(commerces instanceof Array).toBe(true);
        expect(commerces instanceof Business).toBe(false);
        if (commerces.length > 0) expect(commerces[0] instanceof Business).toBe(true);

        console.log("Commerces obtained correctly");
    })
})
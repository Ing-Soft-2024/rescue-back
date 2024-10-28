
const {postOrder} = require("app/order/controller/order.post");
const {getOrderById} = require("app/order/[id]/controller/order.get");


let globalOrder;
describe('Order Tests', () => {

    beforeAll(async () => {
        globalOrder= await postOrder({
            userId: 1,
            businessId: 1,
            status: "in progress",
            cart: [
                {
                    product: { id: 1, price: 10 },
                    quantity: 1
                },
                
            ]
        })
    });

  

    test('Get Order by id', async () => {
        await getOrderById(globalOrder.id)
            .then((order) => {
               
                expect(order.userId).toBe(1);
                expect(order.businessId).toBe(1);
                expect(order.status).toBe('in progress');
                
            })
            .catch((err) => {
                console.error("Error fetching order by id:", err);
            });
    });

    
});

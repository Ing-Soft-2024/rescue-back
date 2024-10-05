import { ApiOperationGet, ApiPath } from "swagger-express-decorators";
import { responseFormula } from "utils/response.util";
import { getListOfOrders } from "./controller/order.get.all";

@ApiPath({
    name: "Orders",
    path: "/order",
    description: "Module to manage orders.",
})
export default class OrdersController {

    @ApiOperationGet({
        description: "Get list of orders",
        summary: "Get list of orders",
        parameters: {
            query: {
                "userId": {
                    type: 'integer',
                    description: "Id of the user",
                    required: false,
                },
                "businessId": {
                    type: 'integer',
                    description: "Id of the business",
                    required: false,
                }
            }
        },
        responses: {
            200: {
                description: "Success",
            }
        },
    })
    GET = (req, res) => responseFormula(res, getListOfOrders(
        req.query.userId,
        req.query.businessId
    ));
}
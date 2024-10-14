import { ApiOperationGet,ApiOperationPost, ApiPath } from "swagger-express-decorators";
import { responseFormula } from "utils/response.util";
import { getOrderById } from "./controller/order.get";
import { postOrderItem } from "./controller/order.item.post";

@ApiPath({
    name: "OrderDetails",
    path: "/order/{id}",
    description: "Module to manage order details.",
})
export default class OrderDetailsController {

    @ApiOperationGet({
        description: "Get order by id",
        parameters: {
            path: {
                id: {
                    type: 'integer',
                    description: "Id of the order",
                    required: true,
                }
            }
        },
        summary: "Get order by id",
        responses: {
            200: {
                description: "Success",
                model: "Order",
            }
        },
    })
    GET = (req, res) => responseFormula(res, getOrderById(req.params.id));

    @ApiOperationPost({
        description: "Post order item",
            parameters: {
                body: {
                    description: "create Order item",
                    required: true,
                    model: "OrderItem",
                },
            },
        summary: "Create an order item",
        responses: {
            200: {
                description: "Success",
                model: "OrderItem",
            }
        },
    })
    POST = (req, res) => responseFormula(res, postOrderItem(req.body));
}
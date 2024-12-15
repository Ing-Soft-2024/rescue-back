import { ApiOperationGet, ApiOperationPost, ApiPath } from "swagger-express-decorators";
import { responseFormula } from "utils/response.util";
import { getListOfOrders } from "./controller/order.get.all";
import { postOrder } from "./controller/order.post";
import { authenticateToken } from "../../middleware/auth.middleware";
import { Authorization } from "utils/jwt/authorization.decorator";

@ApiPath({
    name: "Orders",
    path: "/order",
    description: "Module to manage orders.",
})
export default class OrdersController {
    constructor() {
        // Add middleware to all routes in this controller
        this.GET = [authenticateToken, this.GET];
        this.POST = [authenticateToken, this.POST];
    }

    @ApiOperationGet({
        description: "Get list of orders",
        summary: "Get list of orders",
        security: [{ Bearer: [] }],
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
            },
            401: {
                description: "Unauthorized",
            },
            403: {
                description: "Forbidden",
            }
        },
    })
    @Authorization()
    GET = (req, res) => responseFormula(res, getListOfOrders(
        req.query.userId,
        req.query.businessId
    ));

    @ApiOperationPost({
        description: "Create order",
        summary: "Create order",
        security: [{ Bearer: [] }],
        parameters: {
            body: {
                description: "Order object",
                required: true,
                model: "Order"
            }
        },
        responses: {
            200: {
                description: "Success",
            }
        }
    })
    @Authorization()
    POST = (req, res) => responseFormula(res, postOrder(req.body));
}
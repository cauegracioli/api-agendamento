import { HTTPMethods } from "fastify";
import * as Controller from "../../controllers/user";
import { authenticate } from "../../middlewares/authenticate";

export const userRoutes = [
  {
    url: "/user/details",
    method: "GET" as HTTPMethods,
    preHandler: [authenticate],
    handler: Controller.getUserDetailsController,
  },
  {
    url: "/user/auth",
    method: "POST" as HTTPMethods,
    handler: Controller.loginUserController,
  },
  {
    url: "/user/set-type",
    method: "POST" as HTTPMethods,
    preHandler: [authenticate],
    handler: Controller.setUserTypeController,
  },
];

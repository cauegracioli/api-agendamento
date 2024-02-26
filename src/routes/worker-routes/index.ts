import { HTTPMethods, RouteHandler, preHandlerHookHandler } from "fastify";
import * as Controller from "../../controllers/worker";
import { authenticate } from "../../middlewares/authenticate";
import { isWorker } from "../../middlewares/isWorker";

type Routes = {
  url: string;
  method: HTTPMethods;
  preHandler: preHandlerHookHandler[];
  handler: RouteHandler;
};

export const workerRoutes: Routes[] = [
  {
    url: "/worker/service",
    method: "POST",
    preHandler: [authenticate, isWorker],
    handler: Controller.addServicesWorkerController,
  },
  {
    url: "/worker/:workerId/service/:id",
    method: "PUT",
    preHandler: [authenticate, isWorker],
    handler: Controller.updateServiceController,
  },
  {
    url: "/worker/:workerId/service/:id",
    method: "DELETE",
    preHandler: [authenticate, isWorker],
    handler: Controller.deleteServiceController,
  },
  {
    url: "/worker/:workerId",
    method: "GET",
    preHandler: [authenticate, isWorker],
    handler: Controller.getServicesController,
  },
];

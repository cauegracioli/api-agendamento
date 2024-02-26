import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";

import { handleServerError } from "../../helpers/errors";
import { setWorkerServicesService } from "../../service/worker/add-services.service";

type ServicesType = {
  name: string;
  price: number;
  time: number;
};

interface ServiceSchema extends FastifyRequest {
  body: {
    services: ServicesType[];
    workerId: string;
  };
}

// URL: /services
// preHandler: authenticate, isWorker

export async function addServicesWorkerController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const { body } = request as ServiceSchema;
  try {
    const services = await setWorkerServicesService(body, reply);

    return reply.status(201).send({
      data: services,
      code: "SERVICES_CREATE",
      details: "Serviços criados",
    });
  } catch (error) {
    return handleServerError(reply, error);
  }
}

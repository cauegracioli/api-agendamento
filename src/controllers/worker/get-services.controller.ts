import { FastifyReply, FastifyRequest } from "fastify";
import { getServicesService } from "../../service/worker/get-services.service";
import { handleServerError } from "../../helpers/errors";

export async function getServicesController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const { workerId } = request.params as { workerId: string };

  try {
    const services = await getServicesService(workerId, reply);

    return reply.status(200).send(services);
  } catch (error) {
    return handleServerError(reply, error);
  }
}

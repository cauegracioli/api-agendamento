import { FastifyReply, FastifyRequest } from "fastify";
import { handleServerError } from "../../helpers/errors";
import { deleteServiceService } from "../../service/worker/delete-services.service";

interface IRouteParams {
  id: string;
  workerId: string;
}

export async function deleteServiceController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const { id, workerId } = request.params as IRouteParams;

  try {
    await deleteServiceService({ id: Number(id), workerId }, reply);

    return reply.status(200).send({ id, workerId });
  } catch (error) {
    return handleServerError(reply, error);
  }
}

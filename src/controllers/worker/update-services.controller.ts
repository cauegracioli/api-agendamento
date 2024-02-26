import { FastifyReply, FastifyRequest } from "fastify";
import { handleServerError } from "../../helpers/errors";
import { updateServiceService } from "../../service/worker/update-service.service";

type ServicesType = {
  name: string;
  price: number;
  time: number;
};

export async function updateServiceController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const { name, price, time } = request.body as ServicesType;
  const { workerId, id } = request.params as { workerId: string; id: string };

  try {
    const service = await updateServiceService(
      {
        id: Number(id),
        name,
        price,
        time,
        workerId,
      },
      reply
    );

    return reply.status(200).send(service);
  } catch (error) {
    return handleServerError(reply, error);
  }
}

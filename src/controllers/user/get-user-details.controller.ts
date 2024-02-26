import { FastifyReply, FastifyRequest } from "fastify";
import { handleServerError } from "../../helpers/errors";
import { getUserDetailsService } from "../../service/user/get-user-details.service";

interface IDetailsParams {
  id: string;
}

export async function getUserDetailsController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    const { id } = request.params as IDetailsParams;

    const user = await getUserDetailsService({ id }, reply);

    return reply.status(200).send(user);
  } catch (error) {
    return handleServerError(reply, error);
  }
}

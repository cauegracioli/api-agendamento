import { FastifyReply, FastifyRequest } from "fastify";
import { setUserTypeService } from "../../service/user/set-user-type.service";
import { handleServerError } from "../../helpers/errors";
import { IUserRequest } from "../../interfaces/user";

export async function setUserTypeController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    const data = request.body as IUserRequest;

    const user = await setUserTypeService(data, reply);

    return reply.status(201).send({
      user,
      message: `Usuário definido como ${data.userType}`,
      code: "TYPE_SET",
    });
  } catch (error) {
    console.log(error);
    handleServerError(reply, error);
  }
}

import { FastifyReply, FastifyRequest } from "fastify";
import { handleServerError } from "../../helpers/errors";
import { IUserLogin } from "../../interfaces/user";
import { loginUserService } from "../../service/user/login-user.service";

export async function loginUserController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    const { email, username } = request.body as IUserLogin;

    const { token, details } = await loginUserService(
      { username, email },
      reply
    );

    return reply
      .status(200)
      .header("authorization", token)
      .send({
        code: details ? "USER_LOGGED" : "TYPE_NOT_SET",
        message: "Usuário logado",
      });
  } catch (error) {
    return handleServerError(reply, error);
  }
}

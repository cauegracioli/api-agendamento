import { FastifyInstance } from "fastify";
import { handleServerError } from "../../helpers/errors";
import { IUserRequest } from "../../interfaces/user";
import { userLoginService } from "../../service/login-user.service";

export async function loginUserRoute(app: FastifyInstance) {
  app.post("/login", async (request, reply) => {
    try {
      const data = request.body as IUserRequest;

      const response = await userLoginService(data, reply);

      return reply.status(200).send({ token: response });
    } catch (error) {
      console.log(error);
      handleServerError(reply, error);
    }
  });
}

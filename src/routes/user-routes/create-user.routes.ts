import { FastifyInstance } from "fastify";
import { createUserService } from "../../service/create-user.service";
import { handleServerError } from "../../helpers/errors";
import { IUserRequest } from "../../interfaces/user";

export async function createUserRoute(app: FastifyInstance) {
  app.post("/signup", async (request, reply) => {
    try {
      const data = request.body as IUserRequest;

      const user = await createUserService(data, reply);

      return reply.status(201).send({ userId: user });
    } catch (error) {
      console.log(error);
      handleServerError(reply, error);
    }
  });
}

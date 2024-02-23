import { FastifyInstance } from "fastify";
import { handleServerError } from "../../helpers/errors";
import { IUserRequest } from "../../interfaces/user";
import { userLoginService } from "../../service/login-user.service";

export async function loginUserRoute(app: FastifyInstance) {
  app.post("/login", async (request, reply) => {
    try {
      const data = request.body as IUserRequest;

      const { user, token, refresh } = await userLoginService(data, reply);

      return reply
        .status(200)
        .cookie("refreshToken", refresh)
        .header("authorization", token)
        .send(user);
    } catch (error) {
      console.log(error);
      handleServerError(reply, error);
    }
  });
}

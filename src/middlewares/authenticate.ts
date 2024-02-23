import { FastifyReply, FastifyRequest } from "fastify";
import { verify, sign } from "jsonwebtoken";

export function authenticate(
  request: FastifyRequest,
  reply: FastifyReply,
  done: () => void
) {
  const authToken = request.headers.authorization;

  if (!authToken)
    return reply.status(401).send({
      message: "Não Autorizado",
    });

  const [, token] = authToken.split(" ");

  try {
    verify(token, process.env.SECRET_KEY);

    return done();
  } catch (error) {
    return reply.status(401).send({
      message: "Invalid Token",
    });
  }
}

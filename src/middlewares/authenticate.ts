import { FastifyReply, FastifyRequest } from "fastify";
import {
  verify,
  Secret,
  decode,
  GetPublicKeyOrSecret,
  JwtPayload,
} from "jsonwebtoken";

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
    verify(token, process.env.SECRET_KEY as Secret);

    const { iss, aud } = decode(token) as JwtPayload;

    if (iss !== process.env.JWT_ISSUER && aud !== process.env.JWT_AUDIENCE)
      return reply.status(401).send("Token inválido");

    return done();
  } catch (error) {
    return reply.status(401).send({
      message: "Invalid Token",
    });
  }
}

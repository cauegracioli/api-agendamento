import { FastifyReply, FastifyRequest } from "fastify";

import { JwtPayload, decode } from "jsonwebtoken";

export function isWorker(
  request: FastifyRequest,
  reply: FastifyReply,
  done: () => void
) {
  const header = request.headers.authorization;

  if (!header) return reply.status(401).send("Token não fornecido");

  const [, token] = header?.split(" ");

  const decoded = decode(token) as JwtPayload;

  if (decoded.sub !== "WORKER")
    return reply.status(401).send("Tipo de usuário não permitido");

  return done();
}

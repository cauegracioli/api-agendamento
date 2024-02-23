import { FastifyReply } from "fastify";
import { ERROR500 } from "./constants";

interface RulesError {
  status: number;
  message: String;
  details?: String;
}

export function handleRulesError(reply: FastifyReply, error: RulesError) {
  return reply
    .status(error.status)
    .send({ message: error.message, details: error.details });
}

export function handleServerError(reply: FastifyReply, error: any) {
  return reply.status(ERROR500.statusCode).send({ message: error.details });
}

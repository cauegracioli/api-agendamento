import fastify from "fastify";
import pino from "pino";

const server = fastify({
  logger: pino({ level: "info" }),
});

export { server };

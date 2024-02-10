import fastify from "fastify";
import pino from "pino";

const PORT = process.env.PORT || 8080;

const server = fastify({
  logger: pino({ level: "info" }),
});

export { server };

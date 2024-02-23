import { FastifyInstance } from "fastify";
import { authenticate } from "../../middlewares/authenticate";

export async function refreshTokenRoute(app: FastifyInstance) {
  app.get("/courses", { preHandler: [authenticate] }, (request, reply) => {
    return reply.status(200).send({
      courses: ["React", "Node"],
    });
  });
}

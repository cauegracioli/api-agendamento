import { FastifyReply } from "fastify";
import z from "zod";
import { handleRulesError } from "../../helpers/errors";
import { prisma } from "../../lib/prisma";

export async function getServicesService(
  workerId: string,
  reply: FastifyReply
) {
  const id = z.string().cuid("Formato de id inválido");

  const validate = id.safeParse(workerId);

  if (!validate.success)
    return handleRulesError(reply, {
      message: validate.error.issues
        .map((error) => `${error.message}`)
        .join(" / "),
      status: 400,
      details: "Erro de validação de dados",
    });

  const services = await prisma.services.findMany({
    where: {
      workerId,
    },
    select: {
      id: true,
      name: true,
      price: true,
      time: true,
      reviews: true,
    },
  });

  return services;
}

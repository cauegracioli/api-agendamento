import { FastifyReply } from "fastify";
import z from "zod";
import { handleRulesError } from "../../helpers/errors";
import { prisma } from "../../lib/prisma";

type ServiceParams = {
  id: number;
  workerId: string;
};

export async function deleteServiceService(
  { id, workerId }: ServiceParams,
  reply: FastifyReply
) {
  const params = z.object({
    id: z.number(),
    workerId: z.string().cuid("Formato de id inválido"),
  });

  const validate = params.safeParse({ id, workerId });

  if (!validate.success)
    return handleRulesError(reply, {
      message: validate.error.issues
        .map((error) => `${error.message}`)
        .join(" / "),
      status: 400,
      details: "Erro de validação de dados",
    });

  const service = await prisma.services.findFirst({
    where: {
      id,
      workerId,
    },
  });

  if (!service)
    return handleRulesError(reply, {
      status: 400,
      message: "Serviço não encontrado",
    });

  return await prisma.services.delete({
    where: {
      id,
      workerId,
    },
  });
}

import { FastifyReply } from "fastify";
import z from "zod";
import { handleRulesError } from "../../helpers/errors";
import { prisma } from "../../lib/prisma";

export async function getUserDetailsService(
  params: { id: string },
  reply: FastifyReply
) {
  const validateId = z.object({
    id: z.string().cuid(),
  });

  const idValidate = validateId.safeParse(params);

  if (!idValidate.success)
    return handleRulesError(reply, {
      message: idValidate.error.issues
        .map((error) => `${error.message}`)
        .join(" / "),
      status: 400,
      details: "Erro de validação de dados",
    });

  const user = await prisma.user.findFirst({
    where: {
      id: params.id,
    },
    include: {
      client: true,
      worker: true,
    },
  });

  return user;
}

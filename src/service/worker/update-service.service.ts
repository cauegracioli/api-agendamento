import { FastifyReply } from "fastify";
import { handleRulesError } from "../../helpers/errors";
import { prisma } from "../../lib/prisma";

type UpdateServiceType = {
  id: number;
  name: string;
  time: number;
  price: number;
  workerId: string;
};

export async function updateServiceService(
  { id, name, time, price, workerId }: UpdateServiceType,
  reply: FastifyReply
) {
  const service = await prisma.services.findFirst({
    where: {
      id,
      workerId,
    },
  });

  if (!service)
    return handleRulesError(reply, {
      message: "Serviço não encontrado",
      status: 400,
    });

  const updated = await prisma.services.update({
    where: {
      id,
      workerId,
    },
    data: {
      name,
      price,
      time,
    },
  });

  return updated;
}

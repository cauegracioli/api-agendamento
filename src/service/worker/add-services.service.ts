import z from "zod";
import { handleRulesError } from "../../helpers/errors";
import { FastifyReply } from "fastify";
import { prisma } from "../../lib/prisma";

type ServicesType = {
  name: string;
  price: number;
  time: number;
};

interface ServiceParams {
  services: ServicesType[];
  workerId: string;
}

export async function setWorkerServicesService(
  params: ServiceParams,
  reply: FastifyReply
) {
  if (params.services.length === 0)
    return handleRulesError(reply, {
      message: "Informe ao menos um serviço",
      status: 400,
      details: "Foi passado um array com nenhum item informado",
    });

  const paramsValidation = z.array(
    z.object({
      name: z.string({ required_error: "Informe o nome do serviço prestado" }),
      price: z
        .number({
          required_error: "Informe o valor a ser cobrado pelo serviço",
        })
        .multipleOf(0.01),
      time: z.number({
        required_error: "Todo serviço deve ter um tempo médio de execução",
      }),
    })
  );

  const workerValidation = z
    .string({ required_error: "Informe o id do Worker" })
    .cuid({ message: "Formato de id inválido" });

  const paramsValidate = paramsValidation.safeParse(params.services);
  const workerValidate = workerValidation.safeParse(params.workerId);

  if (!paramsValidate.success)
    return handleRulesError(reply, {
      message: paramsValidate.error.issues
        .map((error) => `${error.message}`)
        .join(" / "),
      status: 400,
      details: "Erro de validação de dados",
    });

  if (!workerValidate.success)
    return handleRulesError(reply, {
      message: workerValidate.error.issues
        .map((error) => `${error.message}`)
        .join(" / "),
      status: 400,
      details: "Erro de validação de dados",
    });

  const servicesWorker = params.services.map((serv) => {
    return {
      ...serv,
      workerId: params.workerId,
    };
  });

  let count = 0;
  let alreadyAdded = [];

  for (const service of servicesWorker) {
    const alreadExist = await prisma.services.findFirst({
      where: {
        workerId: service.workerId,
        name: {
          equals: service.name,
          mode: "insensitive",
        },
      },
    });

    if (alreadExist) {
      alreadyAdded.push(service.name);
      continue;
    } else {
      await prisma.services.create({
        data: service,
      });
      count++;
    }
  }

  return { count, alreadyAdded };
}

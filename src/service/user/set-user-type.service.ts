import { prisma } from "../../lib/prisma";
import { handleRulesError } from "../../helpers/errors";
import z from "zod";
import { IUserRequest } from "../../interfaces/user";
import { FastifyReply } from "fastify";

export async function setUserTypeService(
  params: IUserRequest,
  reply: FastifyReply
) {
  const userCreate = z.object({
    username: z.string(),
    email: z.string(),
    userType: z.enum(["CLIENT", "WORKER"]),
    address: z.string().optional(),
    delivery: z.boolean().optional(),
  });

  const parsed = userCreate.safeParse(params);

  if (!parsed.success) {
    return handleRulesError(reply, {
      message: parsed.error.issues
        .map((error) => `${error.message}`)
        .join(" / "),
      status: 400,
      details: "Erro de validação de dados",
    });
  }

  const { username, email, userType, address, delivery } = parsed.data;

  const user = await prisma.user.update({
    where: {
      username_email: {
        username,
        email,
      },
    },
    data: {
      userType,
    },
  });

  if (userType === "CLIENT") {
    const client = await prisma.client.create({
      data: {
        address,
        userId: user.id,
      },
    });

    await prisma.user.update({
      where: {
        username_email: {
          username,
          email,
        },
      },
      data: {
        clientId: client.id,
      },
    });
  } else {
    const worker = await prisma.worker.create({
      data: {
        address,
        delivery: delivery || false,
        userId: user.id,
      },
    });

    await prisma.user.update({
      where: {
        username_email: {
          username,
          email,
        },
      },
      data: {
        workerId: worker.id,
      },
    });
  }

  return user;
}

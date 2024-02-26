import { FastifyReply } from "fastify";
import { IUserLogin } from "../../interfaces/user";
import z from "zod";
import { handleRulesError } from "../../helpers/errors";
import { prisma } from "../../lib/prisma";
import { Secret, sign } from "jsonwebtoken";

export async function loginUserService(
  params: IUserLogin,
  reply: FastifyReply
) {
  const userParamsValidation = z.object({
    username: z.string(),
    email: z.string().email(),
  });

  const userValidation = userParamsValidation.safeParse(params);

  if (!userValidation.success)
    return handleRulesError(reply, {
      message: userValidation.error.issues
        .map((error) => `${error.message}`)
        .join(" / "),
      status: 400,
      details: "Erro de validação de dados",
    });

  const user = await prisma.user.upsert({
    where: {
      username: params.username,
      email: params.email,
    },
    update: {},
    create: {
      username: params.username,
      email: params.email,
      userType: "CLIENT",
    },
  });

  const token = sign(
    {
      id: user.id,
      username: user.username,
      email: user.email,
    },
    process.env.SECRET_KEY as Secret,
    {
      subject: user.userType,
      issuer: process.env.JWT_ISSUER,
      audience: process.env.JWT_AUDIENCE,
    }
  );

  return { token, details: user.workerId || user.clientId };
}

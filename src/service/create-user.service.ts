import { prisma } from "../lib/prisma";
import { handleRulesError } from "../helpers/errors";
import { genSalt, hash } from "bcrypt";
import z from "zod";
import { IUserRequest } from "../interfaces/user";
import { FastifyReply } from "fastify";

export async function createUserService(
  params: IUserRequest,
  reply: FastifyReply
) {
  const userCreate = z.object({
    username: z
      .string({ required_error: "Nome de usuário é obrigatório" })
      .min(8, "Nome de usuário deve ter no mínimo 8 caracteres"),
    full_name: z.string({ required_error: "Nome completo é obrigatório" }),
    password: z
      .string({ required_error: "Senha é obrigatório" })
      .min(8, "Senha deve ter no mínimo 8 caracteres"),
    primary_email: z.string().email("Preencha com um e-mail válido"),
    phone: z.string({ required_error: "Telefone de contato é obrigatório" }),
    userType: z.enum(["OWNER", "CLIENT", "WORKER"]),
  });

  const { full_name, password, phone, primary_email, userType, username } =
    userCreate.parse(params);

  const userAlreadyExist = await prisma.user.findUnique({
    where: {
      username_primary_email: {
        username,
        primary_email,
      },
    },
  });

  if (userAlreadyExist)
    return handleRulesError(reply, {
      status: 409,
      message: "USER_EXISTS",
      details: "Usuário ou e-mail já em uso",
    });

  const salt = await genSalt(10);

  const hashed = await hash(password, salt);

  const user = await prisma.user.create({
    data: {
      username,
      full_name,
      password: hashed,
      password_salt: salt,
      phone,
      primary_email,
      userType,
    },
  });

  return user.id;
}

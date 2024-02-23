import { FastifyReply } from "fastify";
import { IUserLogin } from "../interfaces/user";
import z from "zod";
import { handleRulesError } from "../helpers/errors";
import { prisma } from "../lib/prisma";
import { compareSync, hash } from "bcrypt";
import jwt from "jsonwebtoken";

require("dotenv").config();

interface IUserPdwError {
  message: string;
  status: number;
  details: string;
}

const userPwdValidationStructureErrorMessage: IUserPdwError = {
  message: "USER_PDW_ERROR",
  status: 400,
  details: "Usuário ou senha incorretos",
};

export async function userLoginService(
  params: IUserLogin,
  reply: FastifyReply
) {
  const userValidationSchema = z.object({
    username: z.string({
      required_error: "Nome de usuário é um campo obrigatório",
    }),
    password: z.string({ required_error: "Senha é um campo obrigatório" }),
  });

  const paramsParsed = userValidationSchema.safeParse(params);

  if (!paramsParsed.success)
    return handleRulesError(reply, {
      message: paramsParsed.error.issues
        .map((error) => `${error.message}`)
        .join(" / "),
      status: 400,
      details: "Erro de validação de dados",
    });

  const { password, username } = paramsParsed.data;

  const user = await prisma.user.findUnique({
    where: {
      username,
    },
  });

  if (!user)
    return handleRulesError(reply, userPwdValidationStructureErrorMessage);

  const validatePwd = compareSync(password, user.password);

  if (!validatePwd)
    return handleRulesError(reply, userPwdValidationStructureErrorMessage);

  const secretKey = process.env.SECRET_KEY;

  const token = jwt.sign({ userId: user.id }, secretKey, {
    expiresIn: "24h",
  });

  return token;
}

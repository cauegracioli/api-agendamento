import { z } from "zod";

export const signUpSchema = {
  body: z.object({
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
  }),
  header: z.object({}),
};

export const loginSchema = {
  body: z.object({
    username: z.string(),
    password: z.string(),
  }),
  header: z.object({}),
};

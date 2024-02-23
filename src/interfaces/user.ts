import { Prisma, User } from "@prisma/client";
import { FastifyRequest } from "fastify";

export interface IUserRequest extends FastifyRequest {
  body: Prisma.UserCreateInput;
  authUser: User;
}

export interface IUserLogin extends FastifyRequest {
  body: {
    username: string;
    password: string;
  };
}

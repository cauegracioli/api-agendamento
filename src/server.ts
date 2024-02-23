import { server } from "./app";
import { createUserRoute } from "./routes/user-routes/create-user.routes";
import { loginUserRoute } from "./routes/user-routes/login-user.routes";
import cookie, { FastifyCookieOptions } from "@fastify/cookie";
import { refreshTokenRoute } from "./routes/user-routes/refresh-token.routes";

require("dotenv").config();

const PORT = process.env.PORT || 3333;

server.register(cookie, {
  secret: process.env.SECRET_KEY,
  hook: "onRequest",
  setOptions: {
    httpOnly: true,
    sameSite: "strict",
    path: "/",
    secure: true,
    domain: "http://localhost:3333",
    expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
  },
  sendOptions: {},
} as FastifyCookieOptions);

server.register(createUserRoute, { prefix: "/api/user" });
server.register(loginUserRoute, { prefix: "/api/user" });
server.register(refreshTokenRoute, { prefix: "/api" });

server.listen({ port: Number(PORT) }).then(() => {
  console.log(`Server running on port ${PORT}`);
});

import { server } from "./app";
import { createUserRoute } from "./routes/user-routes/create-user.routes";
import { loginUserRoute } from "./routes/user-routes/login-user.routes";

require("dotenv").config();

const PORT = process.env.PORT || 3333;

server.register(createUserRoute, { prefix: "/api/user" });
server.register(loginUserRoute, { prefix: "/api/user" });

server.listen({ port: Number(PORT) }).then(() => {
  console.log(`Server running on port ${PORT}`);
});

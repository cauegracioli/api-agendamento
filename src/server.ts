import { server } from "./app";
import { createUserRoute } from "./routes/user-routes/create-user.routes";

const PORT = 3333;

server.register(createUserRoute, { prefix: "/api/user" });

server.listen({ port: PORT }).then(() => {
  console.log(`Server running on port ${PORT}`);
});

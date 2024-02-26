import { server } from "./app";
import { concatRoutes } from "./routes";

require("dotenv").config();

const PORT = process.env.PORT || 3333;

server.register((instance, options, done) => {
  instance.register((subInstance, options, done) => {
    subInstance.register(
      (subSubInstance, options, done) => {
        concatRoutes.forEach((route) => {
          subSubInstance.route(route);
        });

        done();
      },
      { prefix: "api/v1" }
    );

    done();
  });

  done();
});

server.listen({ port: Number(PORT) }).then(() => {
  console.log(`Server running on port ${PORT}`);
});

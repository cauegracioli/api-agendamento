import { workerRoutes } from "./worker-routes";
import { userRoutes } from "./user-routes";

export const concatRoutes = userRoutes.concat(workerRoutes);

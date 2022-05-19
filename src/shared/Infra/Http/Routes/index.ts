import { Router } from "express";
import cars from "./cars.routes";
import categories from "./categories.routes";
import specifications from "./specifications.routes";
import users from "./users.routes";
import rental from "./rental.routes";

const routes = Router();

routes.use("/cars", cars);
routes.use("/categories", categories);
routes.use("/specifications", specifications)
routes.use("/users", users)
routes.use("/rental",rental)




export { routes };
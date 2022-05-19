import { Router } from "express";

import { CreateRentalController } from "@modules/Rentals/UseCases/CreateRental/CreateRentalController";
import { DevolutionRentalController } from "@modules/Rentals/UseCases/DevolutionRental/DevolutionRentalController";
import { ensureAuthenticated } from "../middleware/ensureAuthenticated";
import { ListRentalsByUserController } from "@modules/Rentals/UseCases/ListRentalsByUser/ListRentalsByUserController";


const routes = Router();


routes.post("/", ensureAuthenticated, CreateRentalController.handle);
routes.post("/devolution/:id", ensureAuthenticated, DevolutionRentalController.handle);
routes.get("/user", ensureAuthenticated, ListRentalsByUserController.handle);


export default routes;
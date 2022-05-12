import { Router } from "express";

import { CreateSpecificationController } from "@modules/Cars/UseCases/CreateSpecification/CreateSpecificationController";
import { ListSpecificationController } from "@modules/Cars/UseCases/ListSpecification/ListSpecificationController";
import { ensureAuthenticated } from "@shared/Infra/Http/middleware/ensureAuthenticated";
import { ensureIsAdmin } from "@shared/Infra/Http/middleware/ensureIsAdmin";




const routes = Router();

routes.post("/",ensureAuthenticated, ensureIsAdmin, CreateSpecificationController.handle);

routes.get("/", ListSpecificationController.handle);

export default routes;
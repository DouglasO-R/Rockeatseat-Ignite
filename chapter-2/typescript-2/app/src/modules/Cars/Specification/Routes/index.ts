import { Router } from "express";
import { CreateSpecificationController } from "../UseCases/createSpecification/CreateSpecificationController";
import { ListSpecificationController } from "../UseCases/listSpecification/ListSpecificationController";




const routes = Router();

routes.post("/", CreateSpecificationController.handle);

routes.get("/", ListSpecificationController.handle);

export default routes;
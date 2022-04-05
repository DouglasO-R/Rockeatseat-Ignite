import { Router } from "express";
import { createSpecificationController } from "../UseCases/createSpecification";
import { listSpecificationController } from "../UseCases/listSpecification";



const routes = Router();

routes.post("/", (request, response) => {
    createSpecificationController.handle(request,response);
});

routes.get("/", (request, response) => {
    listSpecificationController.handle(request,response);
});

export default routes;
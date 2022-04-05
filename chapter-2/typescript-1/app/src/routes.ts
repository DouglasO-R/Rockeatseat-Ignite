import { Request, Response, Router } from "express";
import { Controller } from "./Controller";


const routes = Router();

routes.get("/", (request: Request, response: Response) => {
    return response.status(200).json({message:"ola mundo"});
});

routes.post("/course", Controller.create);

export default routes;
import { Request, Router, Response } from "express";
import multer from "multer";

import { CreateController } from "../UseCases/CreateCategory";
import { importCategoryController } from "../UseCases/ImportCategory";
import { ListController } from "../UseCases/ListCategory";


const routes = Router();
const upload = multer({
    dest: "./tmp",
});


routes.post("/", (request: Request, response: Response) => {
    CreateController.handle(request, response);
});

routes.get("/", (request: Request, response: Response) => {
    ListController.handle(request, response);
});

routes.post("/file", upload.single('file'), (request: Request, response: Response) => {
    importCategoryController.handle(request, response);
});

routes.get("/test", (request: Request, response: Response) => {

    try {
        class person {
            private id?: number;
            private name: string;
            private age: number;

            constructor(name: string, age: number, id?: number) {
                
                this.id = !id ? Math.round(Math.random() * 10) : id;
                this.name = name;
                this.age = age
            }
        }

        const doug = new person("douglas", 30);
        response.json(doug);

    } catch (error) {
        response.json({ error });

    }
});

export default routes;
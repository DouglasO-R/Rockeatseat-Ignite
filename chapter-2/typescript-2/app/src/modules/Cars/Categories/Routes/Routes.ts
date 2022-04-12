import { Router } from "express";
import multer from "multer";

import { CreateCategoryController } from "../UseCases/CreateCategory/CreateCategoryController";
import { ImportCategoryController } from "../UseCases/ImportCategory/ImportCategoryController";
import { ListCategoryController } from "../UseCases/ListCategory/ListCategoryController";



const routes = Router();
const upload = multer({
    dest: "./tmp",
});


routes.post("/", CreateCategoryController.handle);

routes.get("/", ListCategoryController.handle);

routes.post("/import", upload.single('file'), ImportCategoryController.handle);


export default routes;
import { Router } from "express";
import multer from "multer";

import { CreateCategoryController } from "@modules/Cars/UseCases/CreateCategory/CreateCategoryController";
import { ImportCategoryController } from "@modules/Cars/UseCases/ImportCategory/ImportCategoryController";
import { ListCategoryController } from "@modules/Cars/UseCases/ListCategory/ListCategoryController";
import { ensureAuthenticated } from "../middleware/ensureAuthenticated";
import { ensureIsAdmin } from "../middleware/ensureIsAdmin";



const routes = Router();
const upload = multer({
    dest: "./tmp",
});


routes.post("/", ensureAuthenticated, ensureIsAdmin, CreateCategoryController.handle);

routes.get("/", ListCategoryController.handle);

routes.post("/import", ensureAuthenticated, ensureIsAdmin, upload.single('file'), ImportCategoryController.handle);


export default routes;
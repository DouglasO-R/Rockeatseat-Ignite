import { Router } from "express";
import multer from "multer";
import uploadConfig from "../../../../config/upload";

import { CreateCarController } from "@modules/Cars/UseCases/CreateCar/CreateCarController";
import { ensureAuthenticated } from "../middleware/ensureAuthenticated";
import { ensureIsAdmin } from "../middleware/ensureIsAdmin";
import { ListAvailableCarsController } from "@modules/Cars/UseCases/ListAvailableCars/ListAvailableCarsController";
import { CreateCarSpecificationController } from "@modules/Cars/UseCases/CreateCarSpecification/CreateCarSpecificationController";
import { UploadCarImagesController } from "@modules/Cars/UseCases/UploadCarImages/UploadCarImageController";

const createCarSpecificationController = new CreateCarSpecificationController();

const routes = Router();
const uploadCarImages = multer(uploadConfig);

routes.post("/",ensureAuthenticated, ensureIsAdmin, CreateCarController.handle);
routes.get("/available", ListAvailableCarsController.handle);
routes.post("/specifications/:id",ensureAuthenticated, ensureIsAdmin, createCarSpecificationController.handle);
routes.post("/images/:id",ensureAuthenticated, ensureIsAdmin,uploadCarImages.array("images"), UploadCarImagesController.handle);




export default routes;
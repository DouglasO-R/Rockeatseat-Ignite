import { Router } from "express";
import multer from "multer";
import uploadConfig from "../../../../config/upload";

import { EnsureAuthenticated } from "../../../../middlewares/EnsureAuthenticated";
import { AuthUserController } from "../Controller/AuthUserController";
import { CreateUserController } from "../Controller/CreateUserController";
import { UpdateUserAvatarController } from "../Controller/UpdateUserAvatarController";



const routes = Router();
const uploadAvatar = multer(uploadConfig.upload("./tmp/avatar"));

routes.post("/test",EnsureAuthenticated ,(request,response)=>{
    const auth = request.headers.authorization;
    response.json({auth});
});

routes.post("/", CreateUserController.handle);
routes.post("/auth", AuthUserController.handle);
routes.patch("/avatar",EnsureAuthenticated, uploadAvatar.single("file"),UpdateUserAvatarController.handle);




export default routes;
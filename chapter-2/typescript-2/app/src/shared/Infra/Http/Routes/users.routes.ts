import { Router } from "express";
import multer from "multer";
import uploadConfig from "../../../../config/upload";

import { ensureAuthenticated } from "../middleware/ensureAuthenticated";
import { AuthUserController } from "../../../../modules/Accounts/Users/Controller/AuthUserController";
import { CreateUserController } from "../../../../modules/Accounts/Users/Controller/CreateUserController";
import { UpdateUserAvatarController } from "../../../../modules/Accounts/Users/Controller/UpdateUserAvatarController";
import { RefreshTokenController } from "@modules/Accounts/Users/Controller/RefreshTokenController";
import { SendForgotPasswordMailController } from "@modules/Accounts/Users/Controller/SendForgotPasswordMailController";
import { ResetPasswordController } from "@modules/Accounts/Users/Controller/ResetPasswordController";



const routes = Router();
const uploadAvatar = multer(uploadConfig);


routes.post("/", CreateUserController.handle);
routes.post("/forgot", SendForgotPasswordMailController.handle);
routes.post("/reset", ResetPasswordController.handle);
routes.post("/auth", AuthUserController.handle);
routes.post("/refresh-token", RefreshTokenController.handle);
routes.patch("/avatar",ensureAuthenticated, uploadAvatar.single("file"),UpdateUserAvatarController.handle);




export default routes;
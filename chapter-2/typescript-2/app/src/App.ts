import "reflect-metadata";
import "./shared/container";
import express, { NextFunction, Request, Response } from "express";
import "express-async-errors";
import swaggerUi from "swagger-ui-express";

import swaggerFile from "./swagger.json";
import { appDatasource } from "./database";
import CategoriesRoutes from "./modules/Cars/Categories/Routes/Routes";
import SpecificationRoutes from "./modules/Cars/Specification/Routes";
import UserRoutes from "./modules/Accounts/Users/Routes"
import { AppError } from "./errors/AppError";


const app = express();

app.use(express.json());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));


app.use("/categories", CategoriesRoutes);
app.use("/specification", SpecificationRoutes)
app.use("/user", UserRoutes)

appDatasource.initialize().then((con) => console.log("Connected")).catch((err) => console.log(err));

app.use((err: Error, request: Request, response: Response, next: NextFunction) => {
    if (err instanceof AppError) {
        return response.status(err.statusCode).json({ message: err.message });
    }

    return response.status(500).json({
        status: "Error",
        message: `Internal Server Errors ${err.message}`
    });
})

export { app };
import "reflect-metadata";
import 'dotenv/config';
import "express-async-errors";
import "@shared/container";
import "@shared/container";

import express, { NextFunction, Request, Response } from "express";
import swaggerUi from "swagger-ui-express";
import { AppError } from "@shared/errors/AppError";


import swaggerFile from "../../../docs/swagger.json";
import { routes } from "./Routes";
import upload from "@config/upload";
import rateLimiter from "@shared/Infra/Http/middleware/rateLimiter";




const app = express();
app.use(rateLimiter);
app.use(express.json());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));
app.use("/avatar", express.static(`${upload.tmpFolder}/avatar`));
app.use("/cars", express.static(`${upload.tmpFolder}/cars`))

app.use(routes)



app.use((err: Error, request: Request, response: Response, next: NextFunction) => {
    if (err instanceof AppError) {
        return response.status(err.statusCode).json({ message: err.message });
    }
    console.log({ err })
    return response.status(500).json({
        status: "Error",
        message: `Internal Server Errors ${err.message}`
    });
})

export { app };
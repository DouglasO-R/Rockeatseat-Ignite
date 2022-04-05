import { Request, Response } from "express";
import { ImportCategoryUseCase } from "./ImportCategoryUseCase";


export class ImportCategoryController {
    constructor(private useCase:ImportCategoryUseCase){}

    handle(request: Request, response: Response): Response {
        try {
            const {file} = request;
            this.useCase.execute(file);
            return response.status(201).send()

        } catch (error) {
            return response.status(400).json({error:error.message})
        }


    }
}
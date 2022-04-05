import { Request, Response } from "express";
import { CreateSpecificationUseCase } from "./CreateSpecificationUseCase";

export class CreateSpecificationController {
    
    private useCase: CreateSpecificationUseCase;

    constructor(useCase:CreateSpecificationUseCase) {
        this.useCase = useCase;
    }

    handle(request: Request, response: Response): Response {
        try {
            this.useCase.execute(request.body);
            return response.status(201).location("/").send();

        } catch (error) {
            console.log(error.stack);
            return response.status(400).json({ error: error.message });
        }
    }
}
import { Request, Response } from "express";
import { ListSpecificationUseCase } from "./ListSpecificationUseCase";

export class ListSpecificationController {

    private useCase: ListSpecificationUseCase;

    constructor(useCase: ListSpecificationUseCase) {
        this.useCase = useCase;
    }

    handle(request: Request, response: Response): Response {
        try {
            const specifications = this.useCase.execute();

            return response.status(200).json({ specifications });

        } catch (error) {

            return response.status(400).json({ error: error.message });
        }
    }
}
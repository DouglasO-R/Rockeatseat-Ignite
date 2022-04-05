import { Request, Response } from "express";
import { CreateCategoryUseCase } from "./CreateCategoryUseCase";
import { RequestDTO } from "./RequestDTO";


export class CreateCategoryController {

    private useCase:CreateCategoryUseCase;

    constructor(useCase:CreateCategoryUseCase){
        this.useCase = useCase;
    }

    handle(request: Request, response: Response): Response {
        try {
            const DTO = new RequestDTO(request.body);
            this.useCase.execute(DTO);
            return response.status(201).location("/").send();

        } catch (error) {
            return response.status(400).json({ error: error.message });
        }
    }
}
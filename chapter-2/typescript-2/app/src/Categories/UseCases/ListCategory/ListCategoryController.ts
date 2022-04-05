import { Request, Response } from "express";
import { ListCategoryUseCase } from "./ListCategoryUseCase";

export class ListCategoryController {
    
    private useCase:ListCategoryUseCase;

    constructor(useCase:ListCategoryUseCase){
        this.useCase = useCase;
    }

    async handle(request: Request, response: Response): Promise<Response> {
        try {
            const categories = await this.useCase.categories();
            return response.status(200).json(categories);

        } catch (error) {
            return response.status(400).json({ error: error.message });
        }
    }
}
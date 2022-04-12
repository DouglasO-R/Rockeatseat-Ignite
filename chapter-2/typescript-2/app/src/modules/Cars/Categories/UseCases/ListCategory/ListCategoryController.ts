import { Request, Response } from "express";
import { container } from "tsyringe";
import { ListCategoryUseCase } from "./ListCategoryUseCase";

export class ListCategoryController {
    

    static async handle(request: Request, response: Response): Promise<Response> {
        try {
            const list = container.resolve(ListCategoryUseCase);

            const categories = await list.categories();
            
            return response.status(200).json(categories);

        } catch (error) {
            return response.status(400).json({ error: error.message });
        }
    }
}
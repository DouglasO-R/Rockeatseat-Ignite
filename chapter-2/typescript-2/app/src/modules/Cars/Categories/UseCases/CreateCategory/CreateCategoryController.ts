import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateCategoryUseCase } from "@modules/Cars/Categories/UseCases/CreateCategory/CreateCategoryUseCase";
import { RequestDTO } from "@modules/Cars/Categories/UseCases/CreateCategory/RequestDTO";


export class CreateCategoryController {

    static async handle(request: Request, response: Response): Promise<Response> {
        try {
            const DTO = new RequestDTO(request.body);

            const createCategory = container.resolve(CreateCategoryUseCase);

            await createCategory.with(DTO);

            return response.status(201).location("/").send();

        } catch (error) {
            return response.status(400).json({ error: error.message });
        }
    }
}
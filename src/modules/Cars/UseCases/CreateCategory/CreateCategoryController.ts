import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateCategoryUseCase } from "./CreateCategoryUseCase";


export class CreateCategoryController {

    static async handle(request: Request, response: Response): Promise<Response> {

        const createCategory = container.resolve(CreateCategoryUseCase);

        await createCategory.with(request.body);

        return response.status(201).location("/").send();

    }
}
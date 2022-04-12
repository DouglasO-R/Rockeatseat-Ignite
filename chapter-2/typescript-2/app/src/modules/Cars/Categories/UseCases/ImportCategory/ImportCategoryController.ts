import { Request, Response } from "express";
import { container } from "tsyringe";
import { ImportCategoryUseCase } from "@modules/Cars/Categories/UseCases/ImportCategory/ImportCategoryUseCase";


export class ImportCategoryController {

    static async handle(request: Request, response: Response): Promise<Response> {
        try {
            const { file } = request;

            const importFile = container.resolve(ImportCategoryUseCase);

            await importFile.execute(file);

            return response.status(201).send();

        } catch (error) {

            return response.status(400).json({ error: error.message })
        }


    }
}
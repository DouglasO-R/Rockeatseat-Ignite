import { Request, Response } from "express";
import { container } from "tsyringe";
import { ListSpecificationUseCase } from "./ListSpecificationUseCase";

export class ListSpecificationController {

    // private useCase: ListSpecificationUseCase;

    // constructor(useCase: ListSpecificationUseCase) {
    //     this.useCase = useCase;
    // }

    static async handle(request: Request, response: Response): Promise<Response> {
        try {

            const listSpecificationUseCase = container.resolve(ListSpecificationUseCase);

            const specifications = await listSpecificationUseCase.execute();

            return response.status(200).json({ specifications });

        } catch (error) {

            return response.status(400).json({ error: error.message });
        }
    }
}
import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateSpecificationUseCase } from "./CreateSpecificationUseCase";

export class CreateSpecificationController {
    
    // private useCase: CreateSpecificationUseCase;

    // constructor(useCase:CreateSpecificationUseCase) {
    //     this.useCase = useCase;
    // }

    static async handle(request: Request, response: Response): Promise<Response> {
        try {
            const CreateSpecification = container.resolve(CreateSpecificationUseCase);

            await CreateSpecification.execute(request.body);
            
            return response.status(201).location("/").send();

        } catch (error) {
            return response.status(400).json({ error: error.message });
        }
    }
}
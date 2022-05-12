import { Request, Response } from "express";
import { container } from "tsyringe";
import { DevolutionRentalUseCase } from "./DevolutionRentalUseCase";


export class DevolutionRentalController {

    static async handle(request: Request, response: Response): Promise<Response> {
        const { id: user_id } = request.user;
        const { id } = request.params;

        const devolutionRentalUseCase = container.resolve(DevolutionRentalUseCase);

        const rental = await devolutionRentalUseCase.with({
            id,
            user_id
        });

        return response.status(201).json(rental);
    }
}